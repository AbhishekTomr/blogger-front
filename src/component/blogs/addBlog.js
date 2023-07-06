import { Button, Dialog, DialogTitle, DialogContent, DialogActions ,TextField } from "@material-ui/core";
import { useState, useContext } from "react";
import userContext from '../../context/userContext';
import { getAllBlogs,addBlog, updateBlog } from "../../services/blogs";
import { getUserInfo } from "../../services/user";

const AddBlog = (props) => {
  const open = props.showAddBlog;
  const setOpen = props.changeShowAddBlog;
  const ctx = useContext(userContext);
  const user = ctx.user;

  const blogData = props.blogData
  const changeBlogData = props.changeBlogData;
  const [error,changeError] = useState({title:'',body:''})


  const handleChange = (event) => {
    changeBlogData(oldState=>({...oldState,[event.target.id]:event.target.value}));
    changeError(oldState=>({...oldState,[event.target.id]:''}));
  }

  const handleClose = () => {
    props.changeBlogData({title:'',body:''})
    props.changeCurrentBlog({});
    setOpen(false);
  };

  const handleSubmit = async () => {
    if(blogData.title.length==0)
    {
      changeError(oldState=>({...oldState,title:'Title Cannot Be Empty!!!'}));
    }
    if(blogData.body.length===0)
    {
      changeError(oldState=>({...oldState,body:'Body Cannot Be Empty!!!'}));
    }
    if(blogData.title.length && blogData.body.length)
    {
      let blog = !props.isEditMode?{
        ...blogData,
        author: user.email,
        created_ts: new Date(),
        updated_ts: new Date(),
        likes: [],
        comments: []
      }:{
        _id: props.currentBlog._id,
        ...blogData,
        author: props.currentBlog.author,
        created_ts: props.currentBlog.created_ts,
        updated_ts: new Date(),
        likes: props.currentBlog.likes,
        comments: props.currentBlog.cumments,
      }

      let response = props.isEditMode?await updateBlog(blog):await addBlog(blog);
      props.changeIsEditMode(false);
      if(response.status)
      {
         let updatedUser = await getUserInfo(user._id);
         ctx.updateUser(updatedUser.data);
      }
      handleClose();
    }

  }

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add New Blog</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            value={blogData.title}
            type="text"
            fullWidth
            variant="standard"
            error={!!error.title}
            helperText={error.title}
            onChange={handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Blog"
            type="text"
            value={blogData.body}
            fullWidth
            variant="standard"
            error={!!error.body}
            helperText={error.body}
            onChange={handleChange}
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{props.isEditMode?'Save':'Publish'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddBlog;