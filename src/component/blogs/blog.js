import { Card, CardHeader, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText, TextField, Button, IconButton } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import './blogs.css';
import { useContext,useState } from "react";
import userContext from "../../context/userContext";
import AddComment from "./addComment";
import { deleteBlog, updateBlog } from "../../services/blogs";
import { getUserInfo } from "../../services/user";
import { deleteComment } from "../../services/comments";

const Blog = (props)=>{
    const ctx = useContext(userContext);

    const deleteThisBlog = async (blogId) =>{
      let response = await deleteBlog(blogId);
      if(response.status)
      {
        const updatedUser = await getUserInfo(ctx.user._id);
        ctx.updateUser(updatedUser.data); 
      }
    }

    const deleteThisComment = async (blog,commentId) => {
      let comment = blog.comments.find(item=> item.id === commentId);
      console.log("comment found",comment);
      if(comment)
      {
        let response = await deleteComment(comment);
        if(response.status)
        {
          let user = await getUserInfo(ctx.user._id);
          
          console.log("updating the user",user.data);
          ctx.updateUser(user.data);
        }
      }
    //   let updatedBlogs = blogUser.blogs.map(item=>{
    //     if(item.id === newBlog.id)
    //     {
    //         return newBlog;
    //     }
    //     return item;
    // })
    // let updatedUser = {...blogUser,blogs:[...updatedBlogs]};
    // ctx.changeAllBlogs(getAllBlogs());
    }

    const blogData = ctx.allBlogs;

    console.log('blog data',blogData);
    
    return (
    <>
    <div>
      {blogData.map((post,index) => (
        <Card key={post._id} style={{ margin: "20px" }}>
          <div className="header-wrap">
            <CardHeader
                avatar={<Avatar>{post.author[0]}</Avatar>}
                title={post.title}
                // subheader={new Date(post.created_ts).toLocaleDateString()}
                subheader={post.author}
            />
            <div className="delete-wrap">
              <Button className="btn space-hr" variant="contained" color="primary" onClick={()=>{
                props.changShowAddBlog(true);
                props.changeIsEditMode(true);
                props.changeBlogData({title:post.title,body:post.body});
                props.changeCurrentBlog(post);
              }}>Update</Button>
            <Typography className='updated-ts' variant="body1" color="textSecondary" component="p">
              {new Date(post.updated_ts).toLocaleString()}
            </Typography>
            {
              (post.author === ctx.user.email) && 
              (   
                <IconButton id='delete-post'>
                        <DeleteIcon onClick={()=>{deleteThisBlog(post._id)}}/>
                </IconButton>
                )
            }
            </div>
          </div>
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              {post.body}
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
              Comments
            </Typography>
            <List>
              {post.comments.map((comment) => (
                <ListItem key={comment.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <Email />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={comment.author} secondary={comment.message} />
                  {(comment.author===ctx.user.email)&&(
                  <IconButton id='delete-comment'>
                    <DeleteIcon onClick={()=>{deleteThisComment(post,comment.id)}}/>
                  </IconButton>)}
                </ListItem>
              ))}
              <AddComment post={post} />
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
    </>);
}

export default Blog;