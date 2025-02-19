import express from "express";
import { addBlog, getAllBlogs, getById, updateBlog, deleteBlog,getByUserId  } from "../controllers/blogController.js";


const BlogRouter = express.Router();

BlogRouter.get("/",getAllBlogs);
BlogRouter.post("/add",addBlog);
BlogRouter.put("/update/:id",updateBlog);
BlogRouter.get("/:id",getById);
BlogRouter.delete("/:id",deleteBlog); 
BlogRouter.get("/user/:id",getByUserId );

export default BlogRouter;