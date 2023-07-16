import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
},{ 
    timestamps: true, //It will generate createdAt and updatedAt automatically for us...
});
userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema);

export default User;