import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authActions } from '../store';
import { useDispatch } from 'react-redux';
const Header = () => {
  const dispath=useDispatch();
  const isLoggedIn = useSelector((state)=>state.isloggedIn);
  const [value,setValue]=useState();
  return (
    <>
    <AppBar position='sticky' >
      <Toolbar>
        <Typography variant='h4'>CoreBlogs</Typography>
       {isLoggedIn && <Box  display='flex' marginLeft='auto'  marginRight='auto' >
          <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)} >
            <Tab  LinkComponent={Link} to="/blogs" label='All Blogs' />
            <Tab LinkComponent={Link} to="/myBlogs" label='My Blogs' />
            <Tab LinkComponent={Link} to="/blogs/add" label='Add Blogs' />

          </Tabs>
        </Box>}
        <Box display="flex" marginLeft='auto'>
        {!isLoggedIn && <>
          <Button  LinkComponent={Link} to="/auth" color="white" margin='1' >Login</Button>
          <Button LinkComponent={Link} to="/auth" color='white' margin='1' >SignUp</Button>
          </>}
          {isLoggedIn && <Button onClick={()=>dispath(authActions.logout())} LinkComponent={Link} to="/auth" color='white' margin='1' >LogOut</Button>}
        </Box>
      </Toolbar>
    </AppBar>
    </>
  )
}

export default Header
