import mongoose from "mongoose"

export const connection = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log("DB is connent");
    } catch (error) {
        console.log("Connection error",error.message)
    }
}