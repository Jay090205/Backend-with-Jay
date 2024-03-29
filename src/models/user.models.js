import mongoose, { Schema } from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";    

const userschema = new mongoose.Schema({
    username:{
        type : String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index: true //searching purpose
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type : String,
        required:true,
        trim:true,
        index: true //searching purpose
    },
    avtar:{
        type : String,//couldinary url
        required : true
    },
    coverimage:{
        type : String
    },
    watchhistory:[{
        type : mongoose.Schema.Types.ObjectId,
        ref  : "video"
    }],
    password:{
        type : String,
        required:[true,"Password is required"]
    },
    refrenceToken:{
        type : String
    }
},{timestamps:true})

userschema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    
    this.password=await bcrypt.hash(this.password,10)
    next();
})

userschema.method.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
}

userschema.method.generateAccessToken = function (){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

userschema.method.generateRefreshToken = function (){
    return jwt.sign({
         _id:this._id
     },
     process.env.REFRESH_TOKEN_SECRET,
     {
         expiresIn : process.env.REFRESH_TOKEN_EXPIRY
     }
     )
 }

export const User = mongoose.model("User",userschema)