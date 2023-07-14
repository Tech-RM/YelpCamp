import Joi from "joi";
import ExpressError from "../Express/expressError.js";
const validationHelper=(JoiSchema,InputData,next)=>{
    const data=JoiSchema.validate(InputData);
    if(data.error){
        const msg=data.error.details.map(res=>res.message).join(",");
        throw new ExpressError(msg,400);
    }else{
        next();
    }
}

export const validateCampData=(req,res,next)=>{
    const dataStructure=Joi.object({
        title: Joi.string().required().min(8).max(50),
        imageUrl:Joi.string(),
        description:Joi.string().required().min(10).max(500),
        price:Joi.number().required().min(1).max(10000),
        location:Joi.string().required().min(5),
    });
    validationHelper(dataStructure,req.body,next);
}


export const validateReview=(req,res,next)=>{
    const dataStructure=Joi.object({
        reviewText:Joi.string().required().min(8).max(100),
        rating:Joi.number().required().min(0).max(5),
    });
    validationHelper(dataStructure,req.body,next);
}