import mongoose from "mongoose";
import BlogModel from "../model/BlogModel.js";
import User from "../model/User.js";

export const getAllBlogs = async (req,res,next)=>{
    let blogs;
    try{
       blogs=await BlogModel.find().populate("user");
    }catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"no blogs found"});
    }
    return res.status(200).json({blogs})
}
export const getById = async (req,res,next)=>{
    let blog;
    try{
        blog=await BlogModel.findById(req.params.id);

    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({blog});
}


export const addBlog = async (req,res,next)=>{
    const {title, discription,image,user}=req.body;
    let existingUser;
    try{
        existingUser=await User.findById(user);
        
    }catch(err){
            return console.log(err)
            }

    if(!existingUser){
        return res.status(404).json({message:"user not found by this id"});
    }

    const blog = new BlogModel({
        title, discription,image,user
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
      await  session.commitTransaction();
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:err}); 
    }
    return res.status(200).json({blog});

}

export const updateBlog= async (req,res,next)=>{
    const {title,discription}=req.body;
    const blogId = req.params.id;
      let blog;
      try{

      
     blog = await BlogModel.findByIdAndUpdate(blogId,{
        title,
        discription

    })
     }
     catch(err){
        return console.log(err);
     }
     if(!blog){
        return res.status(500).json({message:"Unable to Update the blog"});
     }
     return res.status(200).json({blog});
}

export const deleteBlog = async(req,res,next)=>{
    let id = req.params.id;
    let blog;
    try{
        blog=await BlogModel.findByIdAndDelete(id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
       
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"no blogs found"});
    }
    return res.status(200).json({message:"successfully deleted"});
}

export const getByUserId = async (req,res,next)=>{
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
        }
     catch(err){
            return console.log(err);
            }
            if(!userBlogs){
                return res.status(404).json({message:"no blogs found"});
                }
                return res.status(200).json({user:userBlogs});
                
}