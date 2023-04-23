import React, { useState } from 'react';
import './auth.css';
import {
  TextField,
  Button
} from '@material-ui/core';
import {Link} from 'react-router-dom';
import { signup } from '../../services/user';

const SignUp=(props)=>{
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors(errors=>({...errors,[name]: ''}))
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      let response = signup(formData);
      console.log(response.message);
      props.history.push('/login');
    }
  };

  const validateFormData = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!data.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
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
        <h2 className='form-head'>Sign Up</h2>
        <form onSubmit={handleSubmit} className='form sign-up'>
        <TextField 
        id="first-name"
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        error={!!errors.firstName}
        helperText={errors.firstName}
        className='inp-fld' 
        variant="outlined"
        size='small' 
        />
        <TextField 
        id="last-name" 
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={!!errors.lastName}
        helperText={errors.lastName}
        className='inp-fld' 
        variant="outlined"
        size='small' 
         />
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
        className='btn submit-btn'>Sign Up</Button>
        </form>
        <Link to={'/login'}><span className='link-small'>Sign In</span></Link>
    </div>
  );
}


export default SignUp;
