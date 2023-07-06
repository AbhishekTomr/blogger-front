import React from "react";
import {
  Avatar,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import './profile.css';
import { useContext } from "react";
import userContext from "../../context/userContext";

const UserAccount = ({history}) => {
  let ctx = useContext(userContext);
  let user = ctx.user;

  return (
    <Card className="account-wrap" type='paper'>
        <div className="user-name-wrap">
        <Avatar className="avatar">{`${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}</Avatar>
        <Typography className="user-name" variant="h4">{`${user.firstName} ${user.lastName}`}</Typography>
        </div>
        <div className="fld">{user.email}</div>
        <div className="fld">{`Blogs : ${user.blogs.length}`}</div>
        <Button onClick={()=>{history.push('/')}} className="btn center" fullWidth color="primary" variant="contained">Go Back To Dashboard</Button>
    </Card>
  );
};

export default UserAccount;
