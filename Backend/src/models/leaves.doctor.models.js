import mongoose,{Schema} from "mongoose";

const leaveSchema=new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    date:{
        type:[String],
        required:true,
    }
},
{
    timestamps:true,
})

export const Leave=new mongoose.model('Leave',leaveSchema);