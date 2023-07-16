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
        title: Joi.string().required(),
        images:{
            path:Joi.string().required(),
            filename:Joi.string().required(), 
        },
        description:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
    });
    validationHelper(dataStructure,req.body,next);
}
export const validateUpdateCampData=(req,res,next)=>{
    const dataStructure=Joi.object({
        title: Joi.string().required(),
        images:{
            path:Joi.string(),
            filename:Joi.string(),
        },
        description:Joi.string().required(),
        price:Joi.number().required(),
        location:Joi.string().required(),
        deleteImages:Joi.array(),
    });
    validationHelper(dataStructure,req.body,next);
}


export const validateReview=(req,res,next)=>{
    const dataStructure=Joi.object({
        reviewText:Joi.string().required(),
        rating:Joi.number().required(),
    });
    validationHelper(dataStructure,req.body,next);
}