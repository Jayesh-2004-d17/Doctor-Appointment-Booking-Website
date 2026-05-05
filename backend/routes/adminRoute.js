/*import express from 'express'
import { addDoctor } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', upload.single('image'), addDoctor)

export default adminRouter
*/

import express from "express";
import { addDoctor, adminDashboard, allDoctors, appointmentCancel, appointmentsAdmin, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRouter = express.Router();

// ✅ add doctor
adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);

// ✅ login
adminRouter.post("/login", loginAdmin);

// ✅ get all doctors
adminRouter.post("/all-doctors", authAdmin, allDoctors);

// ✅ change availability
adminRouter.post("/change-availability", authAdmin, changeAvailability);

adminRouter.get('/appointments', authAdmin, appointmentsAdmin)

adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)

adminRouter.get('/dashboard', authAdmin, adminDashboard)

export default adminRouter;