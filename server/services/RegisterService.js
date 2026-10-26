import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { AppError } from "../untils/ApiError.js";
import { generateAccessAndRefreshTokens } from "../untils/jwt.js";

export const RegisterUser = async(data)=>{
    console.log(data);
    const {fullname,password,phone,confirmPassword,email} = data;
    try {
        if(!fullname || !email || !password || !phone){
            throw new AppError("Missing required registration fields.",400);
        }
        if(password!==confirmPassword){
            throw new AppError("Passwords do not match.",400)
        }
        const existingEmail = await userModel.findOne({email : email.toLowerCase().trim()});
        if(existingEmail){
            throw new AppError("Email is already registered.",409)
        }
        const existingPhone = await userModel.findOne({phone : phone.trim()});
        if(existingPhone){
            throw new AppError("Phone Number is already registered.",409)
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        console.log(hashPassword);

        const newUser = await userModel.create({
            fullname : fullname.trim(),
            email : email.toLowerCase().trim(),
            phone : phone.trim(),
            password : hashPassword

        })
        return {
            id : newUser._id,
            email : newUser.email
        }
        

    } catch (error) {
        throw new AppError(error.message,200)
    }
}


export const loginUserService = async (data) => {
    const {identifier, password } = data 
    console.log("Service",data);
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier.trim());

  let query;
  if (isEmail) {
    query = { email: identifier.trim().toLowerCase() };
  } else {
    
    query = { phone: identifier.trim() };
  }
    const user = await userModel.findOne(query).select("+password");
    console.log("Exiting ",user);
    if(!user){
        throw new AppError("Invalid email/phone or password",401);
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new AppError("Invalid email/phone or password",401);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id,
      userModel
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    return {
        cookieOptions,
        accessToken,
        refreshToken,
        user
    }
}