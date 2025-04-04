import mongoose,{Schema} from "mongoose";

const availabilitySchema=new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    clinicDays:{
        type:[Number],
        default:[-1,-2,-3,-4,-5,-6,-7],
    },
    clinicStartTime:{
        type:String,
    },
    clinicEndTime:{
        type:String,
    },
    onlineDays:{
        type:[String],
        default:[-1,-2,-3,-4,-5,-6,-7],
        
    },
    onlineStartTime:{
        type:String,
       
    },
    onlineEndTime:{
        type:String,
        
    },

},
{
    timestamps:true,
}
)

export const Availability=mongoose.model('Availability',availabilitySchema)