const mongoose= require("mongoose");
const connection = require("../config/db");

const otpSchema = new mongoose.Schema({
    email:String,
    code : Number,
    expireIn : Number,
},{
    timestamps:true
})

let otp = connection.model("otp", otpSchema)