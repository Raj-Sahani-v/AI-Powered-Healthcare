
import express from "express";
import { bookAppointment, getAppointment, getDoctorAppointments, updateAppointmentStatus } from "../controllers/Apointment.controller.js";
import { verifyDoctor } from "../middlewear/VerifieDoctor.js";


const router = express.Router();

// 1. Patient Route: Nayi appointment book karna
// POST: http://localhost:5000/api/v1/appointments/book
router.post("/book", bookAppointment);

// 2. Doctor Route: Doctor apne saare appointments dekhega (Protected)
// GET: http://localhost:5000/api/v1/appointments/doctor-list?date=2026-10-23&status=Confirmed
// router.get("/appointments", verifyDoctor, getDoctorAppointments);
router.get("/appointments", verifyDoctor, getAppointment);

// 3. Doctor Route: Single appointment details dekhna (Protected)
// GET: http://localhost:5000/api/v1/appointments/:id
// router.get("/:id", verifyDoctor, getAppointmentById);

// 4. Doctor Route: Status update karna ya Notes/Prescription likhna (Protected)
// PATCH: http://localhost:5000/api/v1/appointments/status/:id
router.patch("/status/:id", verifyDoctor, updateAppointmentStatus);

export default router;