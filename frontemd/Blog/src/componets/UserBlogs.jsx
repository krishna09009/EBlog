import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Blog from './Blog';


const UserBlogs = () => {
  const [user,setUser] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async()=>{
    const res =  await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch(err=>console.log(err));
    const data = await  res.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user))
  },[])
 console.log(user); 
  return (
    <>
    {" "}
    {user && user.blogs && user.blogs.map((blog, index) => (
        <Blog isUser={true} key={index} title={blog.title} discription={blog.discription} image={blog.image} userName={user.name} />  
      ))}
    </>
  )
}

export default UserBlogs
