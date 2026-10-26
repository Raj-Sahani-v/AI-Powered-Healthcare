import express from "express"
import { getUserProfile, predict, symptoms, userLogin, UserRegister } from "../controllers/userController.js";
import { searchDoctors } from "../controllers/doctor.contoller.js";
import { bookAppointment } from "../controllers/Apointment.controller.js";
import { refreshAccessToken } from "../untils/refresh-accessToken.js";
import { verfieUser } from "../middlewear/verifieUser.js";


export const userRoute = express.Router();
userRoute.get('/predict',predict);
userRoute.post('/predict',predict);
userRoute.get('/symptoms',symptoms);
userRoute.get('/search',searchDoctors);
userRoute.get('/profile',verfieUser,getUserProfile);
userRoute.post('/appointment',bookAppointment);
userRoute.post('/register',UserRegister);
userRoute.post('/login', userLogin);
userRoute.post('/refresh-token', refreshAccessToken);