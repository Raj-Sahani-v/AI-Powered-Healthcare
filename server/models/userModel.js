import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : [true,"fullname is required"]
    },
    email : {
        type : String,
        required : true ,
        unique : true

    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required :true,
        select : false
    },
    refreshToken : {
        type : String,
        default : null,
        select : false
    }
})
export let userModel = new model('usermodel',userSchema)