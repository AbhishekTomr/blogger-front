import { Button, Dialog, DialogTitle, DialogContent, DialogActions ,TextField } from "@material-ui/core";
import { useState, useContext } from "react";
import userContext from '../../context/userContext';
import { getAllBlogs } from "../../services/blogs";

const AddBlog = (props) => {
  const open = props.showAddBlog;
  const setOpen = props.changeShowAddBlog;
  const ctx = useContext(userContext);
  const user = ctx.user;
  const updateUser = ctx.updateUser;

  const [blogData,changeBlogData] = useState({title: '', body: ''});
  const [error,changeError] = useState({title:'',body:''})


  const handleChange = (event) => {
    changeBlogData(oldState=>({...oldState,[event.target.id]:event.target.value}));
    changeError(oldState=>({...oldState,[event.target.id]:''}));
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
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
      handleClose();
      let blog = {
        id:`${user.id}-${user.blogs.length+1}`,
        ...blogData,
        author: user.email,
        created_ts: new Date(),
        updated_ts: new Date(),
        likes: 0,
        comments: []
      }

      updateUser(user=>({...user, blogs: [...user.blogs,blog]}));
      ctx.changeAllBlogs(getAllBlogs());
      console.log("data to be submitted",blogData);
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
          <Button onClick={handleSubmit}>Publish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddBlog;