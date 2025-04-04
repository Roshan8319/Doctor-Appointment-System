import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema=new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    dateOfBirth:{
        type: String,
    },
    gender:{
        type:String,
        enum: ['Male', 'Female','Others']
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
    appointments:{
         type: Schema.Types.ObjectId,
        ref: "Appointments"
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture:{
        type:String,
        default:"https://i.pinimg.com/736x/09/21/fc/0921fc87aa989330b8d403014bf4f340.jpg"
    },
    pastMedicalHistory:{
        type:String
    },
    refreshToken:{
        type:String,
    }
},
{
    timestamps:true,
}
)


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function(){
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

userSchema.methods.generateRefreshToken=function(){
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


export const User=new mongoose.model("User",userSchema)