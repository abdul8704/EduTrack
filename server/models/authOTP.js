const mongoose = require("mongoose");

const otpVerifySchema = new mongoose.Schema({
    useremail: {
        type: String,
        unique: true,
        required: true,
    },
    otp: {
        type: Number,
        unique: true,
        required: true,
    },
});

module.exports = mongoose.model("otpVerify", otpVerifySchema);
