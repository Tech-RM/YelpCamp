import passport from "passport";
import localStrategy from "passport-local";
import User from "../mongoose/model/user.model.js";
import { app } from "../../app.js";



export const initializePassport=()=>{
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(new localStrategy(User.authenticate()));

        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
}
export const passportLoginHelper=passport.authenticate("local", {failureFlash:true, failureRedirect:"/user/login"});