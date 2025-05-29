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

module.exports = {
    loginValidation,
};