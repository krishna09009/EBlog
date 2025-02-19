import React from 'react'
import {useNavigate} from 'react-router-dom'
import { AppBar, Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
const Blog = ({title,discription,image,userName,isUser,_id}) => {
  const navigate = useNavigate();
  const handelEdit = () => {
    navigate(`/myBlogs/${_id}`)
  }
  console.log(title,isUser);
  return (
    <div>
       <Card sx={{
         width: "40%", 
         margin:'auto',
         mt:2,
         padding:2,
         boxShadow:"5px 5px 10px #ccc",
         ":hover:":{
        boxShadow:"10px 10px 20px #ccc"
       },
       }}>
        {isUser && (
          <Box display={'flex'}>
             <IconButton onClick={handelEdit} sx={{marginLeft:'auto'}} ><EditIcon/></IconButton>
             <IconButton ><DeleteIcon/></IconButton>
          </Box>
        )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName}  
          </Avatar>
        }
     
        title={title} 
       
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" >
        <b>{userName}</b>- {discription} 
        </Typography>
      </CardContent>
     
 
    </Card>
    </div>
  )
}

export default Blog
