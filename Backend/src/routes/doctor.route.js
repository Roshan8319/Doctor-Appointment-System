import { Router } from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyDoctorJWT } from '../middlewares/auth.middleware.js'

import { registerDoctor, loginDoctor, logoutDoctor, updateProfile, updateProfilePicture,listDoctorOnWebsite,doctorAvailability,doctorMarkLeave,getDoctorAppointments,getDoctor, getDoctorAvailability } from '../controllers/doctor.controller.js'


const router = Router()



router.route('/register').post(
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1,
        }
    ]),
    registerDoctor
)

router.route('/login').post(loginDoctor)




///Secured Routes
router.route('/get-doctor').get(verifyDoctorJWT,getDoctor)
router.route('/logout').post(verifyDoctorJWT, logoutDoctor)
router.route('/update-profile').patch(upload.none(), verifyDoctorJWT, updateProfile)
router.route('/update-profile-picture').patch(upload.fields([
    {
        name: "profilePicture",
        maxCount: 1,
    }
]),verifyDoctorJWT, updateProfilePicture)

router.route('/go-live').patch(upload.none(),verifyDoctorJWT,listDoctorOnWebsite)
router.route('/mark-availability').post(upload.none(),verifyDoctorJWT,doctorAvailability)
router.route('/get-availability').get(verifyDoctorJWT,getDoctorAvailability)
router.route('/mark-leave').post(upload.none(),verifyDoctorJWT,doctorMarkLeave)
router.route('/appointments').get(verifyDoctorJWT,getDoctorAppointments)



export default router