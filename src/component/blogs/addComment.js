import { useState,useContext } from "react";
import { TextField,Button } from "@material-ui/core";
import userContext from "../../context/userContext";
import { getUser, updateUser } from "../../services/localStorage";
import { getAllBlogs } from "../../services/blogs";

const AddComment = (props) =>{
    const [comment,changeComment] = useState('');
    const ctx = useContext(userContext);
    const currentBlog = props.post;

    const addComment = (e) => {
        e.preventDefault();
        let newComment = {
            id: currentBlog.comments.length+1,
            email: ctx.user.email,
            comment: comment
        }
        let newBlog = {...currentBlog,comments:[...currentBlog.comments,newComment]};
        let blogUser = getUser(currentBlog.author);
        let updatedBlogs = blogUser.blogs.map(item=>{
            if(item.id === newBlog.id)
            {
                return newBlog;
            }
            return item;
        })
        let updatedUser = {...blogUser,blogs:[...updatedBlogs]};
        updateUser(updatedUser)
        ctx.changeAllBlogs(getAllBlogs());
        changeComment('');
    }

    return (
        <form className="add-comment-wrap" onSubmit={addComment}>
                <TextField 
                 label="Add Comment" 
                 name="comment"
                 value={comment}
                 onChange={(e)=>changeComment(e.target.value)} 
                 fullWidth 
                 required />
                <Button 
                className="btn" 
                size="small" 
                type="submit" 
                variant="contained" 
                color="primary">
                  Add Comment
                  </Button>
        </form>
    )
}

export default AddComment;