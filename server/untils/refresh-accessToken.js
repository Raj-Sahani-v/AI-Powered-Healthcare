import { userModel } from "../models/userModel.js";
import { AppError } from "./ApiError.js";
import jwt from 'jsonwebtoken'

export const refreshAccessToken = async (req, res, next) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      throw new AppError("Unauthorized request: No refresh token", 401);
    }

    console.log(incomingRefreshToken)
    // Verify token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    console.log(decodedToken?._id)
    const user = await userModel.findById(decodedToken?._id);
    console.log(user)
    if (!user) {
      throw new AppError("Invalid refresh token", 401);
    }

    // Verify token matches with DB
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new AppError("Refresh token is expired or already used", 401);
    }

    // Generate new tokens (Token rotation for security)
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id, User);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return res
      .status(200)
      .cookie("refreshToken", newRefreshToken, cookieOptions)
      .json({
        success: true,
        message: "Access token refreshed",
        accessToken,
      });
  } catch (error) {
    next(new AppError(error.message || "Invalid refrsh token", 401));
  }
};