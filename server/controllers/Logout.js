import { userModel } from "../models/userModel";

export const LogoutUser = async (req, res, next) => {
  try {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (incomingRefreshToken) {
      await userModel.findOneAndUpdate(
        { refreshToken: incomingRefreshToken },
        { $set: { refreshToken: null } }
      );
    }

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    
    return res
      .status(200)
      .clearCookie("refreshToken", cookieOptions)
      .json({
        success: true,
        message: "Logged out successfully",
      });
  } catch (error) {
    next(error);
  }
};