const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    currentCourses: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);