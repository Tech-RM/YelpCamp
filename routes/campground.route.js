import express from "express";
import {validateCampData, validateUpdateCampData} from '../utility/JoiValidation/validateFields.js';
import { checkIfAuthor, isLoggedIn } from "../utility/middlewares.js";
import {deleteCampgroundController, editCampgroundController, indexPageController, newCamgroundPage, newCampgroundController, showCampgroundController, updateCampgroundController } from "../controller/camground.controller.js";
import {cloudinaryStorage} from "../utility/cloudinary/cloudinary.utils.js";



const campRouter=express.Router();

campRouter.route('/')
    .get(isLoggedIn,indexPageController)
    .post(isLoggedIn,cloudinaryStorage.array("imageUrl",5),validateCampData,newCampgroundController);

campRouter.get('/new',isLoggedIn,newCamgroundPage);

campRouter.route('/:id')
    .get(isLoggedIn,showCampgroundController)
    .put(isLoggedIn,checkIfAuthor,cloudinaryStorage.array("imageUrl",5),validateUpdateCampData,updateCampgroundController)
    .delete(isLoggedIn,checkIfAuthor,deleteCampgroundController);

campRouter.get('/:id/edit',isLoggedIn,checkIfAuthor,editCampgroundController);


export default campRouter;