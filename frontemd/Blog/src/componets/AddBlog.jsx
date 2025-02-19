import React, { useState } from 'react'
import {InputLabel, Box, TextField, Typography,Button } from '@mui/material'
import axios from 'axios';

const AddBlog = () => {
  const laberl={mb:1,mt:2, fontSize:"24px", fontWeight:"bold"}
  const [inputs, setInputs] = useState({
    title:"",Description:"",imgUrl:""
  });
 const handelChange=(e)=>{
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name]:e.target.value,
}))
 }
 const sendRequest= async()=>{
  const res = await axios.post('http://localhost:5000/api/blog/add',{
    title:inputs.title,
    discription:inputs.Description,
    image:inputs.imgUrl,
    user:localStorage.getItem("userId")

  }).catch(err=>console.log(err));
  const data = await res.data
  return data; 

 }
 const handelSubmit=(e)=>{
  e.preventDefault();
  console.log(inputs);
  sendRequest().then((data)=>console.log(data));

 }

  return (
    <>
      <form onSubmit={handelSubmit}>
        <Box border={3} borderColor='gray' borderRadius={10} boxShadow='10px 10px  20pc #ccc' padding={3} margin={3} display={'flex'} flexDirection={'column' } width={'80%'} marginLeft={'7%'}>
          <Typography fontWeight={'bold'}  padding={2} color='gray' variant='h2' textAlign={'center'}>Post your Blog</Typography>
          <InputLabel sx={laberl} >Title</InputLabel>
          <TextField name='title' onChange={handelChange} value={inputs.title} ></TextField>
          <InputLabel sx={laberl}>Description</InputLabel>
          <TextField name='Description' onChange={handelChange} value={inputs.Description} ></TextField>
          <InputLabel sx={laberl}>ImageURl</InputLabel>
          <TextField name='imgUrl' onChange={handelChange} value={inputs.imgUrl} ></TextField>
          <Button sx={{mt:2,borderRadius:4 }} variant='contained'  type={"submit"}>Submint </Button>



        </Box>
      </form>
    </>
  )
}

export default AddBlog
