import { useState,useContext } from "react";
import { TextField,Button } from "@material-ui/core";
import userContext from "../../context/userContext";
import { addComment } from "../../services/comments";
import { getUserInfo } from "../../services/user";

const AddComment = (props) =>{
    const [comment,changeComment] = useState('');
    const ctx = useContext(userContext);
    const currentBlog = props.post;

    const addThisComment = async (e) => {
        e.preventDefault();
        let newComment = {
            id: currentBlog.comments.length+1,
            blogId: currentBlog._id,
            author: ctx.user.email,
            message: comment
        }
        let response = await addComment(newComment);
        if(response.status)
        {
            let updatedUser = await getUserInfo(ctx.user._id);
            ctx.updateUser(updatedUser.data);
        }
        changeComment('');
    }

    return (
        <form className="add-comment-wrap" onSubmit={addThisComment}>
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