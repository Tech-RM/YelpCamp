import express from "express";
const reviewRouter=express.Router({mergeParams:true});
import { validateReview} from '../utility/JoiValidation/validateFields.js';
import handleAsyncError from '../utility/errorHandling/asyncErrorHandling.js';
import { addReviewToCamp, deleteReviewFromCamp} from '../utility/mongoose/mongoose.utils.js';


reviewRouter.post("/",validateReview,handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const review=req.body;
    await addReviewToCamp(id,review);
    req.flash("success","Successfully created new review!");
    res.redirect(302,`/campground/${id}`);
}))
reviewRouter.delete("/:reviewId",handleAsyncError(async(req,res)=>{
    const {id,reviewId}=req.params;
    await deleteReviewFromCamp(id,reviewId);
    req.flash("success","Successfully deleted review!");
    res.redirect(302,`/campground/${id}`);
}))

export default reviewRouter;