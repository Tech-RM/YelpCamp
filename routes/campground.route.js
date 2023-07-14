import express from "express";
const campRouter=express.Router();
import {validateCampData} from '../utility/JoiValidation/validateFields.js';
import { createNewCampground, deleteCampground, getAllCampgrounds, getParticularCampgroundData, updateCampground } from '../utility/mongoose/mongoose.utils.js';
import handleAsyncError from '../utility/errorHandling/asyncErrorHandling.js';
import { isLoggedIn } from "../utility/middlewares.js";


campRouter.get('/',isLoggedIn,handleAsyncError(async(req,res)=>{
    const camps= await getAllCampgrounds();
    if(!camps){
        req.flash("error","Coudn't find a campground!!");
        res.render('campgrounds',{camps});
    }
    res.render('campgrounds',{camps});
}))
campRouter.post('/',validateCampData,isLoggedIn,handleAsyncError(async(req,res)=>{
    const data=req.body;
    const responce=await createNewCampground(data);
    req.flash("success","Successfully created new campground!");
    res.redirect(302,`/campground/${responce._id}`);
}))
campRouter.get('/new',isLoggedIn,handleAsyncError(async(req,res)=>{
    res.render('newCampground');
}))
campRouter.get('/:id',isLoggedIn,handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const camp= await getParticularCampgroundData(id);
    if(!camp){
        req.flash("error","Coudn't find that campground!!");
        res.redirect(302,"campground");
    }
    res.render('showCampground',{camp});
}))
campRouter.get('/:id/edit',handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const camp= await getParticularCampgroundData(id);
    if(!camp){
        req.flash("error","Coudn't find that campground!!");
        res.redirect(302,"campground");
    }
    res.render('editCampground',{camp});
}))

campRouter.put('/:id',validateCampData,handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    const data=req.body;
    await updateCampground({id,...data});
    req.flash("success","Successfully updated campground!");
    res.redirect(302,`/campground/${id}`);
}))

campRouter.delete('/:id',isLoggedIn,handleAsyncError(async(req,res)=>{
    const {id}=req.params;
    await deleteCampground(id);
    req.flash("success","Successfully deleted campground!");
    res.redirect(302,"/campground");
}))


export default campRouter;