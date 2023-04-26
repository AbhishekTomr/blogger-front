import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {AccountCircle, Add} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import userContext from '../../context/userContext';
import { useContext } from 'react';
import './layout.css';

const Header = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const history = props.history;
    const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    };

    const ctx = useContext(userContext);

    const logout = () => {
      ctx.updateUser(null);
    }

    const handleClose = (event) => {
     history.push(`/user/${event.target.id}`);
     setAnchorEl(null);
    };

    return (
      <AppBar position="static" className='header-wrap' size='small'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={()=>{history.push('/')}}>
            Blogger AI
          </Typography>
          {props.isLoggedIn && (
            <div>
              <IconButton
                size="large"
                aria-label="Add New Blog"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={()=>{props.changeShowAddBlog(true)}}
                color="inherit"
              >
                <Add/>
              </IconButton>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                className='menu-wrap'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem id='profile' className='menu-item' onClick={handleClose}>Profile</MenuItem>
                <MenuItem id='account' className='menu-item' onClick={handleClose}>My account</MenuItem>
                <MenuItem id='account' className='menu-item' onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
}

export default Header;