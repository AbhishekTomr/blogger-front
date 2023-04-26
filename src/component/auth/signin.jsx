import './auth.css';
import {
  TextField,
  Button,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { login, getUserInfo } from '../../services/user';
import userContext from '../../context/userContext';
import { getAllBlogs } from '../../services/blogs';


const SignIn = (props) => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const [errors, setErrors] = useState({});
      const history = props.history;
      const ctx = useContext(userContext);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setErrors(errors=>({...errors,[name]: ''}))
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validateFormData(formData);
        if (Object.keys(errors).length > 0) {
          setErrors(errors);
        } else {
          let response = await login(formData);
          if(response.status)
          {
            let userInfo = await getUserInfo(response.data._id);
            ctx.updateUser(userInfo.data);
            history.push('/');
          }
        }
      };
    
      const validateFormData = (data) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email.trim()) {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(data.email)) {
          errors.email = 'Invalid email format';
        }
        if (!data.password.trim()) {
          errors.password = 'Password is required';
        } else if (data.password.trim().length < 6) {
          errors.password = 'Password must be at least 6 characters long';
        }
        return errors;
      };
    

    return (
        <div className='form-wrap'>
        <h2 className='form-head'>Sign In</h2>
        <form onSubmit={handleSubmit} className='form sign-up'>
        <TextField 
        id="email" 
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className='inp-fld' 
        error={!!errors.email}
        helperText={errors.email}
        variant="outlined"
        size='small' 
         />
        <TextField 
        id="password" 
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password} 
        className='inp-fld' 
        variant="outlined"
        size='small' 
        />
        <Button 
        type='submit' 
        variant='contained'  
        color='primary'
        className='btn submit-btn'>Sign In</Button>
        </form>
        <Link to={'/signup'}><span className='link-small'>Sign Up</span></Link>
    </div>
    );
}

export default SignIn;