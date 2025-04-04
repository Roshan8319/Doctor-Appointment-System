import { Router } from 'express'
import { upload } from '../middlewares/multer.middleware.js'
import { verifyDoctorJWT } from '../middlewares/auth.middleware.js'

import { getAllMedicine } from '../controllers/medicine.controllers.js'


const router = Router()


router.route('/get-all-medicine').get(getAllMedicine)


export default router

