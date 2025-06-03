const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/sendOTP");
const authOTP = require("../models/authOTP")

const sendOTPController = async (req, res) => {
    const { useremail } = req.body;
    const otp = generateOTP();

    try {
        await authOTP.replaceOne(
            { useremail: useremail },
            {
                useremail: useremail,
                otp: otp,
            },
            { upsert: true }
        );

        await sendOTP(useremail, otp);
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        res.status(500).json({
            error: "Failed to send OTP",
            details: err.message,
            otp: otp
        });
    }
};

const verifyOTPController = async (req, res) => {
    const { useremail, otp } = req.body;
    try {
        const storedOTP = await authOTP.findOne({ useremail: useremail });
        
        if (storedOTP.otp === Number(otp)) {
            await authOTP.deleteOne({ useremail: useremail });
            return res
                .status(200)
                .json({ message: "OTP verified successfully" });
        }
    
        return res.status(400).json({ message: "Invalid or expired OTP" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message})
    }
};

module.exports = {
    sendOTPController,
    verifyOTPController,
};
