import bcrypt from 'bcryptjs';
import { doctorModel } from '../models/doctorModel.js';
import { uploadOnCloudinary } from '../untils/cloudniary.js';

export const doctorSignupService = async (data, files) => {
  const {
    fullname,
    email,
    phone,
    password,
    confirmPassword,
    city,
    specialization,
    qualification,
    yoe,
    fees,
    hospitalName,
    mrn,
  } = data;

  console.log("Files data",files)
  console.log("req data",data)
  // 1. Password verification
  console.log(password,confirmPassword)
  if (password !== confirmPassword) {
    const error = new Error('Password and Confirm Password do not match');
    error.statusCode = 400;
    throw error;
  }

  // 2. Check existing user
  const existingDoctor = await doctorModel.findOne({
    $or: [{ email }, { mrn }],
  });

  if (existingDoctor) {
    const error = new Error('Doctor already registered with this email or MRN');
    error.statusCode = 400;
    throw error;
  }

  // 3. Local file paths nikaalein (files argument se)
  const profileLocalPath = files?.profile?.[0]?.path;
  const medicalCertLocalPath = files?.medicalCertificate?.[0]?.path;
  const proofLocalPath = files?.proof?.[0]?.path;

  // 4. Cloudinary upload parallel me karein
  const [uploadedProfile, uploadedCert, uploadedProof, uploadedIdProof] =
    await Promise.all([
      profileLocalPath ? uploadOnCloudinary(profileLocalPath) : null,
      medicalCertLocalPath ? uploadOnCloudinary(medicalCertLocalPath) : null,
      proofLocalPath ? uploadOnCloudinary(proofLocalPath) : null
    ]);

  // 5. Password hash karein (sirf ek baar)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 6. Database me save karein (doctorModel use karein)
  const newDoctor = new doctorModel({
    fullname,
    email,
    phone,
    password: hashedPassword,
    city,
    specialization,
    qualification,
    yoe: Number(yoe),
    fees: Number(fees),
    hospitalName,
    mrn,
    profile: uploadedProfile?.secure_url || '',
    medicalCertificate: uploadedCert?.secure_url || '',
    proof: uploadedProof?.secure_url || ''
  });

  await newDoctor.save();

  // Password hide karke return karein
  const doctorData = newDoctor.toObject();
  delete doctorData.password;

  return doctorData;
};




export const getDoctorService = async()=>{
  const doctors = await doctorModel.find().select('-password').sort({ createdAt: -1 });
  return doctors;
}