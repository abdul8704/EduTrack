const User = require("../models/userDetails");

const getRole = async (req, res) => {
    const { userid } = req.params;
    try {
        const data = await User.findOne({ userid });
        if (!data)
            res.status(404).json({
                success: false,
                message: "user not found ",
            });
        res.status(200).json({ success: true, role: data.role });
    } catch (error) {
        res.status(500).json({ success: false, msg: error.message });
    }
};

module.exports = {
    getRole,
};
