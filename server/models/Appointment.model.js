import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: [true, "Doctor ID is required"],
      index: true,
    },
    // Optional: Logged-in patient ki user ID (history track karne ke liye)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    patientName: {
      type: String,
      required: [true, "Patient name is required"],
      trim: true,
    },
    patientPhone: {
      type: String,
      required: [true, "Patient phone number is required"],
      trim: true,
    },
    patientEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [0, "Age cannot be negative"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not a valid gender",
      },
      required: true,
    },
    appointmentDate: {
      type: String, // Format: YYYY-MM-DD
      required: [true, "Appointment date is required"],
      index: true,
    },
    timeSlot: {
      type: String, // Example: "10:00 AM - 10:30 AM"
      required: [true, "Time slot is required"],
    },
    consultationType: {
      type: String,
      enum: ["In-Clinic", "Online Video"],
      default: "In-Clinic",
    },
    symptoms: {
      type: String,
      required: [true, "Symptoms / Problem description is required"],
      trim: true,
    },
    fees: {
      type: Number,
      required: [true, "Consultation fees are required"],
      min: [0, "Fees cannot be negative"],
    },
    paymentMethod: {
      type: String,
      enum: ["Pay at Clinic", "Online"],
      default: "Pay at Clinic",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refunded"],
      default: "Pending",
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "In-Progress", "Completed", "Cancelled"],
      default: "Confirmed",
      index: true,
    },
    // Doctor ke prescription aur medical remarks ke liye:
    doctorNotes: {
      type: String,
      default: "",
      trim: true,
    },
    prescription: [
      {
        medicineName: { type: String, trim: true },
        dosage: { type: String, trim: true }, // e.g. "1 tab twice daily"
        duration: { type: String, trim: true }, // e.g. "5 days"
      },
    ],
    cancellationReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// 1. Double Booking Prevent karne ke liye Compound Index:
// Ek doctor ke liye same date aur same time par sirf ek ACTIVE appointment ho sakti hai.
appointmentSchema.index(
  { doctorId: 1, appointmentDate: 1, timeSlot: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $nin: ["Cancelled"] } }, // Agar cancel ho chuka hai, toh woh slot dobara book ho sake
  }
);

export const appointmentModel = mongoose.model("Appointment", appointmentSchema);