const nodemailer = require("nodemailer");
require("dotenv");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

module.exports = transporter;
