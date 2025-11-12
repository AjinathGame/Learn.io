import { Schema,model } from "mongoose";

const roadmapSchema = new Schema({
    name:{
        type:String // java
    },
    roadmap:{
        type:String,  // actual road map given by ai
        required:true
    },

    createdBy:{
        type:Schema.Types.ObjectId, // 
        ref:"User"
    },

    status:{
        type:String,
        enum:['private','public'],
        default:'public'
    }

},{timestamps:true});


const  Roadmap = model("Roadmap",roadmapSchema);
export default Roadmap;