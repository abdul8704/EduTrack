const User = require('../models/user_details');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ users });
}

module.exports = {
    getAllUsers
}; 