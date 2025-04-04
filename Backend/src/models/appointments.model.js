import mongoose,{Schema} from 'mongoose'

const appointmentSchema=new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "Doctor"
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookingDate:{
        type:String,
        required:true,
    },
    appointmentDate:{
        type:String,
        required:true,
    },
    appointmentTime:{
        type:String,
        required:true,
    },
    appointmentType:{
        type:String,
        enum:['Online','Clinic Visit']
    },
    status:{
        type:String,
        enum:['Pending','Completed','Cancelled',]
    }
    
},
{
    timestamps:true
}
)

export const Appointments=new mongoose.model('Appointment',appointmentSchema)