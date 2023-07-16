import express from "express";
import { validateReview} from '../utility/JoiValidation/validateFields.js';
import { checkIfReviewAuthor, isLoggedIn } from "../utility/middlewares.js";
import { addReviewController, deleteReviewController } from "../controller/review.controller.js";

const reviewRouter=express.Router({mergeParams:true});

reviewRouter.post("/",isLoggedIn,validateReview,addReviewController);

reviewRouter.delete("/:reviewId",isLoggedIn,checkIfReviewAuthor,deleteReviewController);

export default reviewRouter;