import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req,res)=>{
    // get user detail from frontend
    //validation-not empty
    //check if user already exists:username ,email
    //check for images
    //check for avatar
    //uplod to cloudinary,avatar
    //create user object -- create entry in db
    //remove password and refresh token from response
    //check user creation
    //return response

   const {fullname,email,username,password} = req.body
//    console.log("email:",email)

   if([fullname,username,email,password].some((field)=> field?.trim()==="")){
     throw new ApiError(400,"all fields are required")
   }
   const existeduser = await User.findOne({
    $or:[{username},{email}]
   })
   if(existeduser){throw new ApiError(409,"user with email or user exists")}
   const avatarLocalPath = req.files?.avatar[0]?.path;
//    const coverimagelocalpath = req.files?.coverimage[0]?.path
   let coverimagelocalpath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length >0){
    coverimagelocalpath =req.files.coverImage[0].path
   }
   //console.log(avatarLocalPath)
if(!avatarLocalPath){
throw new ApiError(400,"Avatar required")
}
const avatar = await uploadOnCloudinary(avatarLocalPath)
const cover = await uploadOnCloudinary(coverimagelocalpath)
if(!avatar){
    throw new ApiError(400 ,"avatar is required")
}
const user = await User.create(
    {fullname,
     avatar:avatar.url,
     coverImage:cover?.url || "",
     email,
     password,
     username:username.toLowerCase()   

})
const userCreated =await User.findById(user._id).select("-password -refreshToken")
if(!userCreated){
  throw new ApiError(500,"something went wrong while registering user")
}

return res.status(201).json(
    new ApiResponse(200,userCreated,"user created successfully")
)

//    if(fullName===""){
//     throw new  ApiError(400,"full name is required")

//    }

    // res.status(200).json({message:"ok"})

})

export{registerUser}