import mongoose from "mongoose";
import Campground from "./model/campGround.model.js";
import Review from "./model/review.model.js";
import { deleteImages } from "../cloudinary/cloudinary.utils.js";




// Connection of DATABASE
const dbName="yelpCamp";
const url=`mongodb://127.0.0.1:27017/${dbName}`;
try{
    await mongoose.connect(url);
    console.log("Connected succesfully with given url.");
    const db=mongoose.connection;
    db.on("error", console.error.bind(console, "Connection Error: "));
    db.once("open",()=>{console.log("Database Connection Successful.")});
    //Connection End...//
}catch(err){
    console.log(`Error connecting with given url, error :-${err}`);
}


export const createNewCampground= async(campData)=>{
    const newCamp= new Campground(campData);
    const res=await newCamp.save();
    return res;
}

export const getAllCampgrounds=async()=>{
    const data=await Campground.find({});
    return data;
}

export const getParticularCampgroundData=async(id)=>{
    const data=await Campground.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate("author");
    if(!data){
        console.log("No data found from DB");
        throw Error;
    }else{
        return data;
    }  
}

export const deleteCampground=async(id)=>{
    const data=await Campground.findOneAndDelete({_id:id});
    if(data){
    }else{
        console.log("No such document found");
        throw Error;
    }
}

export const updateCampground=async(id,req)=>{
    const data=req.body;
    const inputImages=req.files.map(file=>({path:file.path,filename:file.filename}));
    
    const res= await Campground.findByIdAndUpdate(id,data);
    res.images.push(...inputImages);
    await res.save();
    if(data.deleteImages){
        //remove the images from cloudinary
    
        await deleteImages(data.deleteImages);
       
        //remove the images from database
        await res.updateOne({
            $pull:{
                images:{
                    filename:{$in:data.deleteImages}
                }}});
    }
    if(res){
        return res;
        }else{
            console.log("No such document found to update");
            throw Error;
        }
}
export const addReviewToCamp=async(campId,author,review)=>{
    if(!(campId&&review&&author)) throw Error;
    try{
        const camp= await Campground.findById(campId);
        const newReview=new Review({author,...review});
        camp.reviews.push(newReview);
        await newReview.save();
        await camp.save();
    }catch(err){
        console.log(err);
        throw Error;
    }
}
export const deleteReviewFromCamp=async(campId,reviewId)=>{
    const targetPull={reviews:reviewId};
    await Campground.findByIdAndUpdate(campId,{$pull:targetPull});
    await Review.findByIdAndDelete(reviewId);
}
