import handleAsyncError from "../utility/errorHandling/asyncErrorHandling.js";
import { addReviewToCamp, deleteReviewFromCamp } from "../utility/mongoose/mongoose.utils.js";


export const addReviewController=handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const review=req.body;
    const author=req.user._id;
    await addReviewToCamp(id,author,review);
    req.flash("success","Successfully created new review!");
    res.redirect(302,`/campground/${id}`);
});

export const deleteReviewController=handleAsyncError(async(req,res)=>{
    const {id,reviewId}=req.params;
    await deleteReviewFromCamp(id,reviewId);
    req.flash("success","Successfully deleted review!");
    res.redirect(302,`/campground/${id}`);
});