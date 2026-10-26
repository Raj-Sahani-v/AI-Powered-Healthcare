import express from 'express';
import { doctorSignupController, getAllDoctors, getMyVerificationStatus, loginDoctor, singleGetDoctor, verifyDoctorDocument } from '../controllers/doctor.contoller.js';
import { upload } from '../middlewear/multer.middlewear.js';
import { updateAppointmentStatus } from '../controllers/Apointment.controller.js';
import { verifyDoctor } from '../middlewear/VerifieDoctor.js';

const router = express.Router();

router.post(
  '/signup',
  upload.fields([
    { name: 'profile', maxCount: 1 },
    { name: 'medicalCertificate', maxCount: 1 },
    { name: 'proof', maxCount: 1 }
  ]),
  doctorSignupController
);
router.get('/all-doctor' , getAllDoctors)
router.get('/all-doctor/:id' , singleGetDoctor)
router.patch('/status/:id' , updateAppointmentStatus)
router.patch('/verify/:id' , verifyDoctorDocument);
router.post('/login',loginDoctor);
router.get("/profile",verifyDoctor,getMyVerificationStatus)

export default router;