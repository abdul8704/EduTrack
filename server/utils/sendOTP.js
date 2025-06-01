const transporter = require("./nodemailer");

const sendOTP = async (toEmail, otp) => {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: toEmail,
        subject: "Your OTP Code",
        html: `<h2>Your OTP is: <b>${otp}</b></h2>`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
