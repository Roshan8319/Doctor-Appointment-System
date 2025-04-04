import {Router} from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import {verifyUserJWT} from '../middlewares/auth.middleware.js'
import { registerUser, loginUser,logoutUser,updateProfile,bookAppointment,getUserAppointments, getDoctorsLive } from '../controllers/user.controllers.js'


const router=Router()


router.route('/register').post(upload.none(),registerUser)
router.route('/login').post(upload.none(), loginUser)
router.route('/doctors-live').get( getDoctorsLive)


//secured Routes

router.route('/logout').post(verifyUserJWT,logoutUser)
router.route('/update-profile').patch(upload.none(),verifyUserJWT,updateProfile)
router.route('/book-appointment').post(upload.none(),verifyUserJWT,bookAppointment)
router.route('/appointments').get(verifyUserJWT,getUserAppointments)


export default router