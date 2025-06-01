const User = require("../models/userDetails");

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

        if (user.passwordHash !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password.",
            });
        }

        // Assuming you want to return some user details on successful login
        const userDetails = {
            username: user.username,
            userid: user.userid,
            email: user.email,
            profilePicture: user.profilePicture,
            role: user.role,
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
    console.log("Received signup request:", req.body);
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Username, email, and password are required.",
        });
    }
    try {
        const newUser = new User({
            username: username,
            userid: email,
            email: email,
            passwordHash: password, // In a real application, hash the password
            profilePicture: "https://static-00.iconduck.com/assets.00/avatar-default-icon-988x1024-zsfboql5.png", // Default or placeholder image
            role: "user", // Default role
        });

        await newUser.save();
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            userDetails: {
                username: newUser.username,
                userid: newUser.userid,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
                role: newUser.role,
            },
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