import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
export const verfieUser = async (req, res, next) => {
  try {
    const token =
      req.cookies.refreshToken ||
      req.headers.authorization.replace("Bearer", "");
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User login required",
      });
    }
    console.log(process.env.REFRESH_TOKEN_SECRET);
    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log(decode);
    const user = await userModel.findById(decode._id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session",
      error: error.message,
    });
  }
};
