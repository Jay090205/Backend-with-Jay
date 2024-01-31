import { asyncHandler } from "../utils/asyncHandler.js";
import {Apierror} from "../utils/Apierror.js"
import {User} from "../models/user.models.js"
import {uploadfileoncloud} from "../utils/fileupload.js"
import { ApiRespons } from "../utils/ApiResponse.js";
const registerUser = asyncHandler( async (req,res) => {
   const {fullname,email,username,password} = req.body
   console.log("Email : ",email);
   if([fullname,email,username,password].some((field)=>
   field?.trim() === "")){
    throw new Apierror(400,"All Field are required")
   }
   const userexisted = User.findOne({
    $or: [{ username }, { email }]
   })   
   console.log(userexisted);
   if(userexisted) {throw new Apierror(409,"User Already existed")}
   const avtarloaclpath=req.files?.avtar[0]?.path;
   console.log(avtarloaclpath);
   const coverImageloaclpath=req.files?.coverimage[0]?.path;
   console.log(coverImageloaclpath);
   if (!avtarloaclpath) {
    throw new Apierror(400,"Avtar is required")
   }

  const avtar = await uploadfileoncloud(avtarloaclpath);
  const coverimage = await uploadfileoncloud(coverImageloaclpath);
  if (!avtar) {
    throw new Apierror(400,"Avtar is required")
   }

  const user =  await User.create({
    fullname,
    email,
    password,
    avtar:avtar.url,
    coverimage:cover?.url || "",
    username : username.toLowerCase()
   })

   const createuser = await User.findById(User._id).select(
    "-password -refrenceToken"
   )

   if (!createuser) {
    throw new Apierror(500,"Some thing went wrong on while regrister")
   }

   return res.status(201).json(
    new ApiRespons(200,createuser,"User register Successfully")
   )
})  


export {registerUser}