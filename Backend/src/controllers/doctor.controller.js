import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Doctor } from '../models/doctor.model.js'
import { LiveDoctor } from '../models/liveDoctors.model.js'
import { Leave } from '../models/leaves.doctor.models.js'
import { Availability } from '../models/availability.doctor.model.js'
import { Appointments } from '../models/appointments.model.js'
import mongoose from 'mongoose'
import { uploadOnCloudinary } from '../utils/cloudinary.js'



const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const doctor = await Doctor.findById(userId)
        const accessToken = doctor.generateAccessToken()
        const refreshToken = doctor.generateRefreshToken()
        doctor.refreshToken = refreshToken
        await doctor.save({ validateBeforeSave: false })


        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}


const registerDoctor = asyncHandler(async (req, res) => {
    //check if any of the entry are null.
    //check if all the user details exist or not.
    //check if user already exist.
    //check if profile picture uploaded----->if yes upload to cloudinary
    //create doctor object---->create entry in db
    //remove password and refresh token from response.
    //check if user is created in db
    //return res

    const { firstName, lastName, email, phone, password } = req.body
    // console.log(req.body);
    // console.log(req.files);


    if (!firstName || !email || !phone || !password) {
        throw new ApiError(400, "All necessary fields are required.")
    }

    if ([firstName, email, phone, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "Blank entry in any field not allowed.")
    }

    const doctorExists = await Doctor.findOne({ email })

    if (doctorExists) {
        throw new ApiError(409, "You are already registered please login to continue.")
    }


    let profilePictureLocalPath;
    if (req.files && Array.isArray(req.files.profilePicture) && req.files.profilePicture.length > 0) {
        profilePictureLocalPath = req.files.profilePicture[0].path
    }

    let profilePicture
    if (profilePictureLocalPath) {
        profilePicture = await uploadOnCloudinary(profilePictureLocalPath)
    }


    const doctor = await Doctor.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        profilePicture: profilePicture?.url
    })

    const createdDoctor = await Doctor.findById(doctor._id).select("-password -refreshToken -specialization")

    if (!createdDoctor) {
        throw new ApiError(500, "Something went wrong while registering the doctor.")
    }

    return res.status(201).json(
        new ApiResponse(200, createdDoctor, "Doctor registered successfully.")
    )
})


const loginDoctor = asyncHandler(async (req, res) => {

    //accept email and password from request.body
    //check for any empty entry
    //match password
    //create access and refresh token
    //return response---->send doctor data and cookies
    console.log(('Inlogin'));

    const { email, password } = req.body


    if (!email || !password) {
        throw new ApiError(400, "Username and password required")
    }

    const doctor = await Doctor.findOne({ email })

    if (!doctor) {
        throw new ApiError(400, "Doctor is not registered,please register to login.")
    }

    const isPasswordCorrect = await doctor.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid login credentials.")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(doctor._id)

    const loggedInDoctor = await Doctor.findById(doctor._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    doctor: loggedInDoctor,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                "User logged in successfully."
            )
        )

})

const getDoctor = asyncHandler(async (req, res) => {

    const doctor = await Doctor.findById(req.doctor._id)
    if (!doctor) {
        throw new ApiError(500, "Something went wrong while fetching doctor information.")
    }
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                doctor,
                "Doctor fetched successfully"
            )
        )

})


const logoutDoctor = asyncHandler(async (req, res) => {


    const doctor = await Doctor.findById(req.doctor._id)
    doctor.refreshToken = undefined
    await doctor.save({ validateBeforeSave: false })


    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const updateProfile = asyncHandler(async (req, res) => {

    const { specialization, experience, degree, street, city, fullAddress, state, pincode, clinicPhone, appointmentFee } = req.body

    // if (!specialization || !experience || !degree || !street || !city || !fullAddress || !state || !pincode || !clinicPhone || !appointmentFee) {
    //     throw new ApiError(400, "All fields are required.")
    // }

    const newDoctor = await Doctor.updateOne({ _id: req.doctor._id },
        {
            $set: {
                specialization,
                experience,
                degree,
                'clinicAddress.street': street,
                'clinicAddress.city': city,
                'clinicAddress.fullAddress': fullAddress,
                'clinicAddress.state': state,
                'clinicAddress.pincode': pincode,
                'clinicAddress.phone': clinicPhone,
                appointmentFee
            }
        },
        { validateBeforeSave: false },
        { new: true },
    )

    if (newDoctor.modifiedCount === 1) {
        res.status(200)
            .json(
                new ApiResponse(200, newDoctor, "Doctor profile updated successfully.")
            )
    } else {
        throw new ApiError(500, "Failed to update doctor details.")
    }
})


const updateProfilePicture = asyncHandler(async (req, res) => {
    //check files in request 
    //upload to cloudinary
    //update link in db
    //return new user

    if (!req.files) {
        throw new ApiError(400, "Profile picture is required.")
    }
    const profilePictureLocalPath = req.files?.profilePicture[0].path;
    if (!profilePictureLocalPath) {
        throw new ApiResponse(400, "Profile picture is required")
    }
    const profilePicture = await uploadOnCloudinary(profilePictureLocalPath)
    await Doctor.findByIdAndUpdate(req.doctor._id, {
        $set: {
            profilePicture: profilePicture?.url,
        }
    })
    const newDoctor = await Doctor.findById(req.doctor._id)
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                newDoctor,
                "Profile picture updates successfully."
            )
        )




})


const listDoctorOnWebsite = asyncHandler(async (req, res) => {

    const { goLive } = req.body

    if (goLive === true) {
        const doctor = await Doctor.findById(req.doctor._id)

        if (!(await LiveDoctor.findOne({ doctor: req.doctor._id }))) {

            await LiveDoctor.create({
                doctor: req.doctor._id
            })
 
        }
        await Doctor.findByIdAndUpdate(req.doctor._id, {
            $set: {
                liveOnWebsite: true
            }
        })

        const newDoctor = await Doctor.findById(req.doctor._id)

        return res.status(200)
            .json(
                new ApiResponse(200, newDoctor, "Doctor is now listed on the website.")
            )
    } else {
        //finding doctor in Live Doctor
        const liveDoctor = await LiveDoctor.findOne({ doctor: req.doctor._id })
        const success = await LiveDoctor.deleteOne({ doctor: liveDoctor.doctor })

        if (success) {
            await Doctor.findByIdAndUpdate(req.doctor._id, {
                $set: {
                    liveOnWebsite: false
                }
            })

            const newDoctor = await Doctor.findById(req.doctor._id)

            return res.status(200)
                .json(
                    new ApiResponse(200, newDoctor, "Doctor remove from website successfully.")
                )
        } else {
            throw new ApiError(500, "Error occurred while removing doctor from live website.")
        }


    }
})


const doctorAvailability = asyncHandler(async (req, res) => {

    const { clinicDays, clinicStartTime, clinicEndTime, onlineDays, onlineStartTime, onlineEndTime } = req.body


    const updateAvailability = await Availability.findOne({ doctor: req.doctor._id })

    if (updateAvailability) {

        await Availability.updateOne(
            { doctor: req.doctor._id },
            {
                $set: {
                    clinicDays,
                    clinicStartTime,
                    clinicEndTime,
                    onlineDays,
                    onlineStartTime,
                    onlineEndTime,
                },
            }
        )
    } else {
        await Availability.create({
            doctor: req.doctor._id,
            clinicDays,
            clinicStartTime,
            clinicEndTime,
            onlineDays,
            onlineStartTime,
            onlineEndTime,
        })
    }


    const createdAvailability = await Availability.find({ doctor: req.doctor._id })
    if (!createdAvailability) {
        throw new ApiError(500, "Something went wrong while creating availability.")
    }
    return res.status(201).json(
        new ApiResponse(200, createdAvailability, "Doctor's availability updated successfully.")
    )





})

const getDoctorAvailability = asyncHandler(async (req, res) => {
    console.log("in get avability route");

    const availability = await Availability.findOne({ doctor: req.doctor._id })
    if (availability) {
        return res.status(200)
            .json(
                new ApiResponse(200, availability, "Availability fetched successfully")
            )
    }
    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Doctor has not updated his availability.")
        )

})


const doctorMarkLeave = asyncHandler(async (req, res) => {
    const { date } = req.body
    if (!date) {
        throw new ApiError(400, "Date is required")
    }

    const doctorLeave = await Leave.findOne({ doctor: req.doctor._id })
    if (doctorLeave) {
        await Leave.updateOne({ doctor: req.doctor._id }, { $push: { date: date } })
    } else {
        await Leave.create({
            doctor: req.doctor._id,
            date,
        })
    }


    const leave = await Leave.findOne({ doctor: req.doctor._id })

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                leave,
                "Leaves updated successfully."
            )
        )
})


const getDoctorAppointments = asyncHandler(async (req, res) => {
    const doctorAppointments = await Appointments.aggregate([
        {
            $match: {
                doctor: new mongoose.Types.ObjectId(req.doctor._id)
            }
        }
    ]);

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                doctorAppointments,
                "User Appointments Fetched SuccessFully"
            )
        )
})








export { registerDoctor, loginDoctor, logoutDoctor, updateProfile, updateProfilePicture, listDoctorOnWebsite, doctorAvailability, doctorMarkLeave, getDoctorAppointments, getDoctor, getDoctorAvailability }