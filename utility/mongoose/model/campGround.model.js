import mongoose from "mongoose";
const Schema=mongoose.Schema;

const campgroundSchema=new Schema({
    title:{
        type:String,
        required:true,
        min:8,
        max:50,
        unique:true,
    },
    location:{
        type:String,
        required:true,
        unique:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
        max:10000,
    },
    description:{
        type:String,
        required:true,
        min:10,
        max:500,
    },
    imageUrl:{
        type:String,
        required:true,
    },
},
{ 
    timestamps: true, //It will generate createdAt and updatedAt automatically for us...
},
);
const Campground=mongoose.model("camp",campgroundSchema);

export default Campground;