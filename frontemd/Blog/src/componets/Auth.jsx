import {Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {authActions} from '../store'
import { useNavigate } from 'react-router-dom';


const Auth = () => {
  const naviagte=useNavigate();

  const dispath=useDispatch();
  const [inputs, setInputs] = useState({
    name:"",email:"",password:""
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const handelChange=(e)=>{
    setInputs((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value,
    }))
  } 
  const sendRequest = async (type="login")=>{
  const res= await axios.post(`http://localhost:5000/${type}`,{
    name:inputs.name,  
    email:inputs.email,
      password:inputs.password
    }).catch(err=>console.log(err));
    const data =await res.data;
    console.log(data);

    return data;
  }
  const handelSubmit  =(e)=>{
    e.preventDefault()
    console.log(inputs);
    if(isSignUp){


      //.then((data)=>localStorage.setItem("userId",data.User._id))localStorage.setItem('userId', data.user._id);
      sendRequest("signup")
      .then((data)=>localStorage.setItem("id",data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>naviagte("/blogs")).then(data=>console.log(data)).catch((err) => console.log(err));;
    }else{
      sendRequest()
      .then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispath(authActions.login()))
      .then(()=>naviagte("/blogs")).then(data=>console.log(data)).catch((err) => console.log(err));;
    }
  }
  return (
    <>
      <form  onSubmit={handelSubmit} >
        <Box
      maxWidth={400}   display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={"center"} boxShadow={"10px 10px 20px #ccc"} padding={3} margin={'auto'}  marginTop={5} borderRadius={5}>
          <Typography padding={2} textAlign={'center'} variant='h2' >{isSignUp ?"SignUp":  'LogIn'}</Typography>
        {isSignUp && ( <TextField name="name" onChange={handelChange} value={inputs.name} placeholder='Name' margin='normal'/>)}{' '}
          <TextField name="email" onChange={handelChange} value={inputs.email} placeholder='Email' type='email' margin='normal'/>
          <TextField name="password" onChange={handelChange}  value={inputs.password} placeholder='password' type='password' margin='normal'/>
          <Button type='submit' variant='contained' color='warning' sx={{marginTop:2}} >Submint</Button>
          <Button sx={{marginTop:1}} variant='contained'
          onClick={()=>{
            setIsSignUp(!isSignUp)
          }}
          >Change to {isSignUp ?"Login":  'SignUp'}</Button>
        </Box>
      </form>
   
    </>
  )
}

export default Auth;