import React, { useEffect,useState } from 'react'
import Blog from './Blog';
import axios from 'axios'
const Blogs = () => {
  const [blogs,setBLogs]=useState([]);
  const sendRequest = async ()=>{
    const res= await axios.get("http://localhost:5000/api/blog").catch(err=>console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(()=>{ 
    sendRequest().then(data=>setBLogs(data.blogs));
  },[]);
  console.log(blogs);
  return (
    <>
     {/* {blogs || blogs.map((blog,index)=>  <Blog/>    )} */}

     {blogs && blogs.map((blog, index) => (
        <Blog
        id={blog._id}
        isUser={localStorage.getItem('userId')===blog.user._id}
         title={blog.title} discription={blog.discription} image={blog.image} userName={blog.user.name} key={index}  />  
      ))}
 
    </>
  )
}

export default Blogs
