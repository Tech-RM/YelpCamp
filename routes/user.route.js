import express from "express";
import { storeReturnTo } from "../utility/middlewares.js";
import { RegistrationFormController, loginPageController, logoutController, userIndexPage, userLoginController, userRegistrationController } from "../controller/user.controller.js";
import { passportLoginHelper } from "../utility/passport/passport.utils.js";


const userRouter=express.Router();

userRouter.get("/",userIndexPage);

userRouter.route("/register")
    .get(RegistrationFormController)
    .post(userRegistrationController);

userRouter.route("/login")
    .get(loginPageController)
    .post(storeReturnTo,passportLoginHelper,userLoginController);

userRouter.get("/logout",logoutController);



export default userRouter;
