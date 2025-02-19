import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogschema = new Schema({
    title:{
        type:String,
        require:true,
    },
    discription:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        require:true
    }

})

export default mongoose.model("BlogModel", blogschema );