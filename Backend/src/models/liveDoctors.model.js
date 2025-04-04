import mongoose,{Schema} from "mongoose";

const liveDoctorSchema=new Schema(
    {
        doctor: {
            type: Schema.Types.ObjectId,
            ref: "Doctor"
        },
    },
    {
        timestamps:true,
    }
)

export const LiveDoctor=new mongoose.model('LiveDoctor',liveDoctorSchema)