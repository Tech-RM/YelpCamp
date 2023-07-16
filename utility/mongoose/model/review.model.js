import mongoose from "mongoose";
const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    reviewText :{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},
{ 
    timestamps: true, //It will generate createdAt and updatedAt automatically for us...
});

const Review =mongoose.model("Review",reviewSchema);

export default Review;