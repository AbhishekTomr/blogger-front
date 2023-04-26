import { Button, Dialog, DialogTitle, DialogContent, DialogActions ,TextField } from "@material-ui/core";
import { useState, useContext } from "react";
import userContext from '../../context/userContext';
import { getAllBlogs,addBlog } from "../../services/blogs";
import { getUserInfo } from "../../services/user";

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
      handleClose();
      let blog = {
        ...blogData,
        author: user.email,
        created_ts: new Date(),
        updated_ts: new Date(),
        likes: [],
        comments: []
      }

      let response = await addBlog(blog);
      if(response.status)
      {
         let updatedUser = await getUserInfo(user._id);
         ctx.updateUser(updatedUser.data);
      }
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