import Campground from "./mongoose/model/campGround.model.js";
import Review from "./mongoose/model/review.model.js";

export const isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl;
        req.flash("error","You must login first.");
        return res.redirect(302,"/user/login");
    }
    next();
};

export const storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};
export const checkIfAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const camp= await Campground.findById(id);
    
    if(!camp.author._id.equals(req.user._id)){
        req.flash("error","You don't have permission to do this operation!!!");
        return res.redirect(302,`/campground/${id}`);
    }
    next();
}
export const checkIfReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review= await Review.findById(reviewId);
    
    if(!review.author._id.equals(req.user._id)){
        req.flash("error","You don't have permission to do this operation!!!");
        return res.redirect(302,`/campground/${id}`);
    }
    next();
}
