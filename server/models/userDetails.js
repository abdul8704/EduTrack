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
    profilePicture: {
        type: String,
        default: 'default-profile-pic.png',
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    position: {
        type: String,
        default: 'Software Engineer',
    },
    currentCourses: {
        type: [String],
        default: [],
    },
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);