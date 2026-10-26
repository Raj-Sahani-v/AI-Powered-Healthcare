import e from "express"
import 'dotenv/config'
import { server } from "./server.js";
import router from './routes/doctor.route.js'
import cors from 'cors'
import { userRoute } from "./routes/userRoute.js";
import appointmentRoutes from "./routes/Appointment.routes.js";
import { connection } from "./config/db.js";
import cookieParser from "cookie-parser";
export const app = e();



app.use(cors({
    origin : ['http://localhost:5173','http://localhost:5174'],
    credentials : true
    
}));

app.use(e.json());
app.use(cookieParser());

app.use('/api/v1/doctor',router)
app.use('/api/v1/user',userRoute);
app.use('/api/v1/appointments',appointmentRoutes);
connection();
const port = process.env.PORT || 6000;
server(port);
