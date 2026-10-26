// import {appointmentModel} from '../models/Appointment.model.js'

import { appointmentModel } from '../models/appointment.model.js';
import { doctorModel } from '../models/doctorModel.js';

export const bookAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      patientName,
      patientPhone,
      patientEmail,
      age,
      gender,
      appointmentDate,
      timeSlot,
      consultationType,
      symptoms,
      paymentMethod
    } = req.body;

    
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    
    const existingBooking = await appointmentModel.findOne({
      doctorId,
      appointmentDate,
      timeSlot,
      status: { $ne: 'Cancelled' }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'this is already booked. Please change the time'
      });
    }

   
    const newAppointment = new Appointment({
      doctorId,
      patientName,
      patientPhone,
      patientEmail,
      age: Number(age),
      gender,
      appointmentDate,
      timeSlot,
      consultationType,
      symptoms,
      fees: doctor.fees,
      paymentMethod
    });

    await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: 'Appointment successfully book',
      data: newAppointment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Appointment booking server error',
      error: error.message
    });
  }
};


// Doctor ke specific date ke appointments fetch karna
export const getDoctorAppointments = async (req, res, next) => {
  try {
    const doctorId = req.doctor._id; // Auth middleware se aayega
    const { date, status } = req.query;
    console.log("Query resquest",req.query)

    const query = { doctorId };

    // Agar date filter di gayi ho (e.g. today: "2026-10-23")
    if (date) {
      query.appointmentDate = date;
    }

    // Status filter (Confirmed, Completed, etc.)
    if (status && status !== "All") {
      query.status = status;
    }

    const appointments = await Appointment.find(query).sort({ timeSlot: 1 });

    // Dashboard quick summary counts
    const today = date || new Date().toISOString().split("T")[0];
    const totalToday = await Appointment.countDocuments({ doctorId, appointmentDate: today });
    const pendingCount = await Appointment.countDocuments({ doctorId, appointmentDate: today, status: "Pending" });
    const completedCount = await Appointment.countDocuments({ doctorId, appointmentDate: today, status: "Completed" });

    return res.status(200).json({
      success: true,
      metrics: {
        totalToday,
        pendingCount,
        completedCount,
      },
      data: appointments,
    });
  } catch (error) {
    next(error);
  }
};

// Doctor dwara Status aur Notes update karna
export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, doctorNotes, prescription } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      {
        $set: {
          ...(status && { status }),
          ...(doctorNotes !== undefined && { doctorNotes }),
          ...(prescription && { prescription }),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};


export const getAppointment=async(req,res,next)=>{
  try {
    const doctorId = req.doctor._id;
    
    const data = await appointmentModel.find({doctorId});
    if(!data){
      return res.status(400).json({
        success : false,
        message : "appointent nahi mila"
      })
    }
    return res.status(200).json({
      success : true,
      message : "appointment fetched",
      data  : data
    })
  } catch (error) {
    next(error)
  }
}