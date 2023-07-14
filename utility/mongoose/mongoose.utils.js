import mongoose from "mongoose";
import Campground from "./model/campGround.model.js";
import Review from "./model/review.model.js";



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


export const createNewCampground= async(data)=>{
    const newCamp= new Campground(data);
    const res=await newCamp.save();
    return res;
}

export const getAllCampgrounds=async()=>{
    const data=await Campground.find({});
    return data;
}

export const getParticularCampgroundData=async(id)=>{
    const data=await Campground.findById(id).populate("reviews").populate("author");
    console.log("Data from utils",data);
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
    console.log(`Deleted Campground:- ${data}`);
    }else{
        console.log("No such document found");
        throw Error;
    }
}

export const updateCampground=async(data)=>{
    const query={_id:data.id};
    const res= await Campground.findOneAndUpdate(query,data);
    if(res){
        console.log(`Updated Campground:- ${res}`);
        return res;
        }else{
            console.log("No such document found to update");
            throw Error;
        }
}
export const addReviewToCamp=async(id,review)=>{
    if(!id||!review) throw Error;
    try{
        const camp= await Campground.findById(id);
        const newReview=new Review(review);
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