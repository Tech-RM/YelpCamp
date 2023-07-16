import mongoose from "mongoose";
import Review from "./review.model.js";
const Schema=mongoose.Schema;

const imageSchema=new Schema({
        path:{
            type:String,
            required:true,
        },
        filename:{
            type:String,
            required:true,
        },
});
imageSchema.virtual("thumbnail").get(function(){
    return this.path.replace("/upload","/upload/w_200");
})
imageSchema.virtual("slider").get(function(){
    return this.path.replace("/upload","/upload/w_300");
})

const campgroundSchema=new Schema({
    title:{
        type:String,
        required:true,
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
    },
    description:{
        type:String,
        required:true,
    },
    images:[imageSchema],
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
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