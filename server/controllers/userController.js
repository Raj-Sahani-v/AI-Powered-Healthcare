import { userModel } from "../models/userModel.js";
import { loginUserService, RegisterUser } from "../services/RegisterService.js";
import { getDoctorSpecialty } from "../untils/diseeaseSpeciality.js";


export const predict = async (req, res) => {
    try {
        console.log(req.body);
     const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    console.log(data);
    const recommend = await getDoctorSpecialty(data.predicted_disease);
    console.log("re",recommend)
    res.json({data,doctorRecommend : recommend});
    } catch (error) {
        res.status(500).json({
            msg : "symptom api error",
            error : error.message
        })
    }
}


// Get symptoms from Python Flask API
export const symptoms = async(req,res)=>{
  try {
    const response = await fetch(
      "http://127.0.0.1:5000/symptoms"
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error("Symptoms API error:", error.message);

    res.status(502).json({
      error: "Python API se symptoms load nahi ho paaye.",
    });
  }
};


export const UserRegister = async(req,res)=>{
  try {
    const data = await RegisterUser(req.body);
    console.log(data)
    return res.status(201).json({
      success : true,
      message : "successfully register",
      data
    })
    
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      success : false,
      message : error.message || "Unable to register"
    })
  }
}


export const userLogin = async (req,res) => {
  try {
    const data = await loginUserService(req.body);
    console.log("login server",data?.refreshToken)
    return res
      .status(200)
      .cookie("refreshToken", data?.refreshToken, data?.cookieOptions)
      .json({
        success: true,
        message: "Login successful",
        accessToken: data?.accessToken,
        user: {
          id: data.user._id,
          fullname: data.user.fullname,
          email: data.user.email,
          phone: data.user.phone,
        },
      });
  } catch (error) {
    return res.status(error.statusCode||400).json({
      success : false,
      message : error.message || "Unable to Login"
    })
  }
}


export const getUserProfile = async(req,res)=>{
  try {
    const id = req.user._id;
    console.log("id: ",id);
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Internal Server Error" });
    }
    return res.status(200).json({
      success : true,
      message : "User fetched",
      data : user
    })

  } catch (error) {
     return res.status(error.statusCode||400).json({
      success : false,
      message : error.message || "Unable to profile"
    })
  }
}
