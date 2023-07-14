import mongoose from "mongoose";
import Review from "./review.model.js";
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
        min:5,
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
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review",
        }
    ],
},
{ 
    timestamps: true, //It will generate createdAt and updatedAt automatically for us...
},
);

campgroundSchema.post("findOneAndDelete", async function(doc){
    if(doc){
        await Review.deleteMany({_id:{$in:doc.reviews}});
    }

})
const Campground=mongoose.model("Campground",campgroundSchema);

export default Campground;