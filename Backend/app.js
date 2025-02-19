import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes.js";
import BlogRouter from "./routes/blogRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/",router);
app.use("/api/blog",BlogRouter);

mongoose
  .connect(
    //"mongodb+srv://dkushal129:VuCz3Ydq2jTRodnZ@12.u6f8p.mongodb.net/"  VuCz3Ydq2jTRodnZ  kqwer
   "mongodb+srv://dkushal129:kqwer@12.u6f8p.mongodb.net/?retryWrites=true&w=majority&appName=12"
   // "mongodb+srv://dkushal129:kqwer@12.u6f8p.mongodb.net/?retryWrites=true&w=majority&appName=12"
    
  )
  .then(() => app.listen(5000)) 
  .then(() => 
    console.log(" connected to database  Server is running on port 5000")
  )
  .catch((err) => console.log(err));

