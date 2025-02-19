import Header from './componets/Header'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import Auth from './componets/Auth'
import  Blogs  from "./componets/Blogs";
import UserBlogs from "./componets/UserBlogs"
import BlogDetails from "./componets/BlogDetails"
import AddBlog from "./componets/AddBlog"
import { useSelector } from 'react-redux';
// import {isLoggedIn} from './componets/store/index'


function App() {
  const isLoggedIn = useSelector((state)=>state.isloggedIn);
  console.log(isLoggedIn);

  

  return (
    <>
    <header>
      <Header/>
    </header>
     <main>
      <Routes>{//parent element = Routes it will tell us on which route which componets to render  
      }
      <Route path ="/auth" element={<Auth/>}/>
      <Route path ="/blogs" element={<Blogs/>}/>
      <Route path ="/blogs/add" element={<AddBlog/>}/>
      <Route path ="/myBlogs" element={<UserBlogs/>}/>
      <Route path ="/myBlogs/:id" element={<BlogDetails/>}/>

      </Routes>

     </main>
    </>
  )
}

export default App
