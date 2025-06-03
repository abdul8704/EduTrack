const User = require("../models/userDetails");
const bcrypt = require('bcrypt')
require('dotenv').config()

const loginValidation = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required.",
        });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        console.log(req.body)
        const correctPass = await bcrypt.compare(password, user.passwordHash);
        if (!correctPass) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        // Assuming you want to return some user details on successful login
        const userDetails = {
            userid: user._id,
            role: user.role,
            username: user.username
        };

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            userDetails: userDetails,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Server error.",
            errorMessage: error.message,
        });
    }
}

const signupValidation = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Username, email, and password are required.",
        });
    }
    try {
        console.log(password)
        const hashedpass = await bcrypt.hash(
            password,
            Number(process.env.HASH_SALT)
        );

        const newUser = new User({
            username: username,
            userid: email,
            email: email,
            passwordHash: hashedpass, // In a real application, hash the password
            profilePicture:
                "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png", // Default or placeholder image
            role: "user", // Default role
        });

        await newUser.save();

        const unique_id = await User.findOne({ email: email });

        await User.updateOne(
            { email: email },
            {
                $set: {
                    userid: unique_id._id,
                },
            }
        );
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            userid: unique_id._id,
        });
    }catch (error) {
        console.error("Error during signup:", error);

        return res.status(500).json({
            success: false,
            message: "Server error.",
            errorMessage: error.message,
        });
    }
}



const checkExistingUser = async (req, res) => {
    const { useremail } = req.body;
    const existingUser = await User.findOne({ email: useremail });

    if (existingUser)
        return res
            .status(400)
            .json({ success: false, message: "User already exists" });
    
    return res.status(200).json({ success: true, message: "user doesnt exist" })
}
module.exports = {
    loginValidation,
    signupValidation,
    checkExistingUser,
};