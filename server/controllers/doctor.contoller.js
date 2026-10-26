import { accessSync } from "fs";
import { doctorSignupService } from "../services/doctor.service.js";
import { doctorModel } from "../models/doctorModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { generateAccessAndRefreshTokens } from "../untils/jwt.js";

export const doctorSignupController = async (req, res) => {
  try {
    // req.body aur req.files service ko pass karein
    const doctor = await doctorSignupService(req.body, req.files);

    return res.status(201).json({
      success: true,
      message: 'Doctor account successfully registered.',
      data: doctor,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const getAllDoctors = async(req,res)=>{
  console.log("waiting")
  try {
    const doctors = await doctorModel.find().select('-password').sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
     return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}

export const singleGetDoctor = async(req,res)=>{
  try {
    if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({success : "false" , message : "Invaild Id"})
    const doctors = await doctorModel.findById(req.params.id).select('-password');
  if(!doctors){
    return res.status(404).json({success : "false", message : "Doctor not Found"})
  }
    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
     return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
}





export const searchDoctors = async (req, res) => {
  try {
    const { department, keyword } = req.query;
    console.log(department,keyword)
    const query = {};

    // 1. Sirf verified doctors ko search me dikhana hai (agar verification system active hai)
    // query.isVerified = true; // (Optional: jarurat ke anusaar uncomment karein)

    // 2. Department / Specialization filter
    if (department && department.trim() !== '') {
      query.specialization = { $regex: department.trim(), $options: 'i' };
    }

    // 3. Keyword filter (Doctor name, City, ya Hospital name me se match karega)
    if (keyword && keyword.trim() !== '') {
      const searchRegex = { $regex: keyword.trim(), $options: 'i' };
      query.$or = [
        { fullname: searchRegex },
        { city: searchRegex },
        { hospitalName: searchRegex },
        { qualification: searchRegex }
      ];
    }

    // Database search query execution
    const doctors = await doctorModel.find(query).select('-password').sort({ createdAt: -1 });
    console.log(doctors)

    return res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Doctors search karne me error aaya.',
      error: error.message
    });
  }
};



export const verifyDoctorDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { docType, status } = req.body; 
    console.log(
      req.body
    )

    const updateFields = {};
    if (docType === "proof") updateFields.proofVerified = status;
    if (docType === "certificate") updateFields.certificateVerified = status;
    if (docType === "profile") updateFields.profileVerified = status;

    const doctor = await doctorModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

    
    const allApproved =
      doctor.proofVerified === "approved" &&
      doctor.certificateVerified === "approved" &&
      doctor.profileVerified === "approved";

    doctor.status = allApproved ? "approved" : doctor.status;
    doctor.isActive = allApproved;
    await doctor.save();

    return res.status(200).json({ success: true, message: "Status updated", doctor });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const trimmed = identifier.trim();

    // Determine query type (MRN, Email, or Phone)
    let query = {};
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) { query = { email: trimmed.toLowerCase() }; } else if (/^\+?[0-9]{10,14}$/.test(trimmed)) {
      query = { phone: trimmed };
    } else {
      query = { mrn: trimmed.toUpperCase() }; // Matches Medical Registration Number
    }

    const doctor = await doctorModel.findOne(query).select("+password");
    if (!doctor) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Check verification status
    if (doctor.status === "rejected") {
      return res.status(403).json({
        success: false,
        message: `Your profile was rejected. Reason: ${doctor.rejectionReason || "Please contact admin."}`,
      });
    }

    // Generate Tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(doctor._id, doctorModel);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie("doctorRefreshToken", refreshToken, cookieOptions)
      .json({
        success: true,
        message: "Doctor authenticated",
        accessToken,
        doctor: {
          id: doctor._id,
          fullname: doctor.fullname,
          email: doctor.email,
          specialization: doctor.specialization,
          isActive: doctor.isActive,
          status: doctor.status,
        },
      });
  } catch (error) {
    next(error);
  }
};



export const getMyVerificationStatus = async (req, res) => {
  try {
    // req.doctor verifyDoctor middleware se aa raha hai (JWT token decrypt karke)
    // Iska matlab jis doctor ka token hai, sirf usi ka data database se niklega
    const doctorId = req.doctor._id;
    console.log("Verificatiom ",doctorId)

    const doctor = await doctorModel.findById(doctorId).select(
      "fullname mrn status isActive proofVerified certificateVerified profileVerified rejectionReason"
    );

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    return res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};