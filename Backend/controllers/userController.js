import User from "../model/User.js";
import bcrypt from "bcryptjs";
import BlogModel from "../model/BlogModel.js";

export const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();

    } catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"Np Users found"});
    }
    return res.status(200).json({users});
};
export const singup = async (req,res,next)=>{
    const {name,email,password}=req.body;
    
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return console.log(err);
    }
    if(existingUser){
        res.status(400).json({message:"User already exisst"});//400 unautherised
    }
    const hashpassword=bcrypt.hashSync(password);   
    const user = new User({
        name,
        email,
        password:hashpassword,
        blogs:[]
        
    });
 
    try{
        await
        user.save();
    }catch(err){
       return console.log(err);
    }
    return res.status(200).json({user});
}


export const login= async (req,res,next)=>{
    const {email,password}=req.body;
    
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }catch(err){
       return console.log(err);
    }
    if(!existingUser){
        res.status(404).json({message:"User is not exisst"});//404 
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"incorrect password"});
    }
    return res.status(200).json({message:"Login successfull",user:existingUser});

}