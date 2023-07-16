import handleAsyncError from "../utility/errorHandling/asyncErrorHandling.js";
import { createNewCampground, deleteCampground, getAllCampgrounds, getParticularCampgroundData, updateCampground } from "../utility/mongoose/mongoose.utils.js";

export const indexPageController=handleAsyncError(async(req,res)=>{
    const camps= await getAllCampgrounds();
    if(!camps){
        req.flash("error","Coudn't find a campground!!");
        res.render('campgrounds',{camps});
    }
    res.render('campgrounds',{camps});
});

export const newCamgroundPage=handleAsyncError(async(req,res)=>{
    res.render('newCampground');
});

export const newCampgroundController=handleAsyncError(async(req,res)=>{
    const campData=req.body;
    campData.author=req.user._id;
    campData.images=req.files.map(file=>({path:file.path,filename:file.filename}));
    const responce=await createNewCampground(campData);
    req.flash("success","Successfully created new campground!");
    res.redirect(302,`/campground/${responce._id}`);
});

export const showCampgroundController=handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const camp= await getParticularCampgroundData(id);
    if(!camp){
        req.flash("error","Coudn't find that campground!!");
        res.redirect(302,"campground");
    }
    res.render('showCampground',{camp});
});

export const editCampgroundController=handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const camp= await getParticularCampgroundData(id);
    if(!camp){
        req.flash("error","Coudn't find that campground!!");
        res.redirect(302,"campground");
    }
    res.render('editCampground',{camp});
});

export const updateCampgroundController=handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    await updateCampground(id,req);
    req.flash("success","Successfully updated campground!");
    res.redirect(302,`/campground/${id}`);
});

export const deleteCampgroundController=handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    await deleteCampground(id);
    req.flash("success","Successfully deleted campground!");
    res.redirect(302,"/campground");
});