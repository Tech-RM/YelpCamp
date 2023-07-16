import handleAsyncError from "../utility/errorHandling/asyncErrorHandling.js";
import User from "../utility/mongoose/model/user.model.js";

export const userIndexPage=handleAsyncError((req,res)=>{
        res.send("Welcome to user route.")
});

export const RegistrationFormController=(req,res)=>{
    res.render("userRegistrationForm");
};

export const userRegistrationController=handleAsyncError(async(req,res)=>{
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
});

export const loginPageController=(req,res)=>{
    res.render("userLoginForm");
};

export const logoutController=(req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash("success","You have successfully logged out.");
        res.redirect(302,"/user/login");   
    });
};

export const userLoginController=handleAsyncError(async(req,res)=>{
    req.flash("success","Welcome back to YelpCamp.");
    const redirectUrl=res.locals.returnTo||"/campground";
    delete req.session.returnTo;
    res.redirect(302,redirectUrl);
});