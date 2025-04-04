import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { Appointments } from '../models/appointments.model.js'
import { Doctor } from '../models/doctor.model.js'
import { LiveDoctor } from '../models/liveDoctors.model.js'
import mongoose from 'mongoose'


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })


        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, phone, password} = req.body

    if (!firstName || !email || !phone || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        throw new ApiError(400, "You are already registered please login to continue.")
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully.")
    )

})

const loginUser = asyncHandler(async (req, res) => {

    //accept email and password from request.body
    //check for any empty entry
    //match password
    //create access and refresh token
    //return response---->send doctor data and cookies

    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Username and password required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User is not registered,please register to login.")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid login credentials.")
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password,-refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully."
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user._id)
    user.refreshToken = undefined
    await user.save({ validateBeforeSave: false })


    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out successfully."))
})

const updateProfile = asyncHandler(async (req, res) => {

    const { dateOfBirth, gender, pastMedicalHistory } = req.body

    const newUser = await User.updateOne({ _id: req.user._id },
        {
            $set: {
                dateOfBirth,
                gender,
                pastMedicalHistory,
            }
        },
        { validateBeforeSave: false },
        { new: true },
    )

    if (newUser.modifiedCount === 1) {
        const user = await User.findById(req.user._id)
        res.status(200)
            .json(
                new ApiResponse(200, user, "User profile updated successfully.")
            )
    } else {
        throw new ApiError(500, "Failed to update doctor details.")
    }
})

const bookAppointment = asyncHandler(async (req, res) => {
    const { doctorId, appointmentDate, appointmentTime, appointmentType } = req.body

    if (!doctorId || !appointmentDate || !appointmentTime || !appointmentType) {
        throw new ApiResponse(400, "All the fields are required.")
    }
    const doctor = await Doctor.findById(doctorId).select("-password -refreshToken")

    if (!doctor.liveOnWebsite) {
        throw new ApiError(400, "Could not book an appointment as this doctor is not accepting any bookings at present.")
    }

    const appointment = await Appointments.create({
        doctor: doctor,
        patient: req.user._id,
        bookingDate: (new Date()).toISOString().slice(0, 10),
        appointmentDate,
        appointmentTime,
        appointmentType,
    })

    if (!appointment || !doctor) {
        return new ApiError(400, "Something went wrong while booking your appointment")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                appointment,
                "Appointment booked successfully."
            )
        )




})

const getUserAppointments = asyncHandler(async (req, res) => {
    const userAppointments = await Appointments.aggregate([
        {
            $match: {
                patient: new mongoose.Types.ObjectId(req.user._id)
            }
        }
    ]);

    return res.status(200)
        .json(
            new ApiResponse(
                200,
                userAppointments,
                "User Appointments Fetched SuccessFully"
            )
        )
})


const getDoctorsLive = asyncHandler(async (req, res) => {

    const liveDoctors = await LiveDoctor.aggregate([
        {
            $lookup: {
                from: 'doctors', // collection name in MongoDB (make sure it matches)
                localField: 'doctor',
                foreignField: '_id',
                as: 'doctorDetails',
            },
        },
    ]);


    return res.status(200)
        .json(
            new ApiResponse(
                200,
                liveDoctors[0].doctorDetails,
                "Live Doctors Fetched Successfully"
            )
        )
})




export { registerUser, loginUser, logoutUser, updateProfile, bookAppointment, getUserAppointments, getDoctorsLive }