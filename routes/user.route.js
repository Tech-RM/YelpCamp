import express from "express";
const userRouter=express.Router();
import handleAsyncError from '../utility/errorHandling/asyncErrorHandling.js';
import User from "../utility/mongoose/model/user.model.js";
import passport from "passport";
import { storeReturnTo } from "../utility/middlewares.js";


userRouter.get("/",(req,res)=>{
    res.send("Welcome to user route.")
});

userRouter.get("/register",(req,res)=>{
    res.render("userRegistrationForm");
});

userRouter.post("/register",handleAsyncError(async(req,res)=>{
    const {name,username,email,password}=req.body;
    try{
        const newUser=new User({name,username,email});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,function(err){
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to YelpCamp!!!!");
            res.redirect(302,"/campground");
        });
    }catch(e){
        req.flash("error",e.message);
        console.log(e);
        res.redirect(302,"/user/register");
    }
}));

userRouter.get("/login",(req,res)=>{
    res.render("userLoginForm");
});

userRouter.post("/login",storeReturnTo,passport.authenticate("local", {failureFlash:true, failureRedirect:"/user/login"}), handleAsyncError(async(req,res)=>{
    req.flash("success","Welcome back to YelpCamp.");
    const redirectUrl=res.locals.returnTo||"/campground";
    delete req.session.returnTo;
    res.redirect(302,redirectUrl);
}));

userRouter.get("/logout",(req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash("success","You have successfully logged out.");
        res.redirect(302,"/user/login");   
    });
});



export default userRouter;
