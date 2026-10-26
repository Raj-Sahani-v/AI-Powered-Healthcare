
import jwt from "jsonwebtoken";
import { doctorModel } from "../models/doctorModel.js";

export const verifyDoctor = async (req, res, next) => {
  try {
    const token =
      req.cookies?.doctorAccessToken ||
      req.headers.authorization?.replace("Bearer ", "");

      console.log("Token",token)
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Doctor login required" });
    }
console.log(process.env.ACCESS_TOKEN_SECRET)
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decode",decoded)
    const doctor = await doctorModel.findById(decoded._id);
    console.log("middlewear me doctor verifie",doctor)
    console.log(doctor)
    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor not found" });
    }

    req.doctor = doctor; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired session",error : error.message });
  }
};