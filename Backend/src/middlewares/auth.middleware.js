import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Doctor } from "../models/doctor.model.js";
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'


const verifyDoctorJWT = asyncHandler(async (req, res, next) => {
  console.log("in Verify Doctor JWT");
    const authToken = req.headers.authorization
    if (!authToken) {
      throw new ApiError(401, "Unauthorized access. No Authorization header found.");
    }
    const accessTokenMatch = authToken.match(/^Bearer (.+)$/);
    if (!accessTokenMatch) {
      throw new ApiError(401, "Unauthorized access. Invalid Authorization header format.");
    }
    const accessToken = accessTokenMatch[1];
    try {
      if (!accessToken) {
        throw new ApiError(401, "Unauthorized access.");
      }
      
      const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  
      const doctor = await Doctor.findById(decodedToken._id).select("-password -refreshToken");
      if (!doctor) {
        throw new ApiError(401, "Invalid Access Token.");
      }
  
      req.doctor = doctor;
      next();
    } catch (error) {
      throw new ApiError(401, "Invalid access Token");
    }
  });

const verifyUserJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken
        if(!token){
            throw new ApiError(401,"Unauthorized access.")
        }
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
        if(!user){
            throw new ApiError(401,"Invalid Access Token.")
        }
        req.user=user
        next()
    } catch (error) {
        console.log(error);
        throw new ApiError(401,"Invalid access Token")
    }
})

export {verifyDoctorJWT,verifyUserJWT}