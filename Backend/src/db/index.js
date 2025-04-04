import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB connection successful.");        
    } catch (error) {
        console.log("MONGODB connection failure.",error);
        process.exit(1)
    }
}

export {connectDB}