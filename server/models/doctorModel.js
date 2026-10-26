import mongoose, { model } from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^\+?[0-9]{10,14}$/, "Please enter a valid phone number"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    qualification: {
      type: String,
      required: [true, "Qualification is required"],
      trim: true,
    },

    mrn: {
      type: String,
      required: [true, "Medical registration number is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    fees: {
      type: Number,
      required: [true, "Consultation fees are required"],
      min: [0, "Fees cannot be negative"],
    },

    hospitalName: {
      type: String,
      required: [true, "Hospital name is required"],
      trim: true,
    },

    specialization: {
      type: String,
      required: [true, "Specialization is required"],
      trim: true,
      index: true, // Fast filtering by specialization
    },

    yoe: {
      type: Number,
      required: [true, "Years of experience are required"],
      min: [0, "Experience cannot be negative"],
    },

    // --- 3 Photos / Documents ---
    profile: {
      type: String,
      default: "",
    },

    medicalCertificate: {
      type: String,
      required: [true, "Medical certificate is required"],
    },

    proof: {
      type: String,
      required: [true, "Identity proof is required"],
    },

    // --- Photo-Specific Verification Status ---
    profileVerified: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    certificateVerified: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    proofVerified: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // --- Overall Account Status ---
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected", "suspended"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
      index: true,
    },

    isActive: {
      type: Boolean,
      default: false,
      index: true, // Patient search queries ke liye index
    },

    rejectionReason: {
      type: String,
      default: null,
      trim: true,
    },

    // Auth Management ---
    // refreshToken: {
    //   type: String,
    //   default: null,
    //   select: false,
    // },
  },
  {
    timestamps: true,
  }
);

export const doctorModel = model("Doctor", doctorSchema);