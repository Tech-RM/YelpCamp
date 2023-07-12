import Joi from "joi";
import ExpressError from "../Express/expressError.js";

const validateOutgoingCampData=(req,res,next)=>{
    const dataStructure=Joi.object({
        title: Joi.string().required().min(5).max(50),
        imageUrl:Joi.string(),
        description:Joi.string().required().min(30),
        price:Joi.number().required().min(1).max(5000),
        location:Joi.string().required().min(5),
    });
   
    const data=dataStructure.validate(req.body);
    if(data.error){
        const msg=data.error.details.map(res=>res.message).join(",");
        throw new ExpressError(msg,400);
    }else{
        next();
    }
    

}
export default validateOutgoingCampData;