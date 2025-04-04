import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const doctorSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        specialization: {
            type: String,
            default:"Others",
        },
        experience: {
            type: String,
            default:"0",
        },
        degree: {
            type: String,
            default:"None"
        },
        ratings:{
            type:Number
        },
        clinicAddress: {
            street: { type: String},
            street: { type: String},
            city: { type: String},
            fullAddress: { type: String},
            state: { type: String,default:"None"},
            pincode: { type: Number},
            clinicPhone: { type: String}
        },
        profilePicture:{
            type:String,
            default:"https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
        },
        appointmentFee:{
            type:Number,
        },
        liveOnWebsite: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        availability: {
            type: Schema.Types.ObjectId,
            ref: "availability"
        },
        leave: {
            type: Schema.Types.ObjectId,
            ref: "leave"
        },
        appointments: {
            type: Schema.Types.ObjectId,
            ref: "appointments"
        }
    },
    {
        timestamps: true,
    }
)

doctorSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

doctorSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

doctorSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            firstName:this.firstName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

doctorSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}







export const Doctor=mongoose.model("Doctor",doctorSchema)