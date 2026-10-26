import jwt from "jsonwebtoken";
import { AppError } from "./ApiError.js";


export const generateAccessAndRefreshTokens = async (userId, userModel) => {
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Generate Access Token
    const accessToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Generate Refresh Token
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );


    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new AppError(error.message || "Error generating tokens", 500);
  }
};