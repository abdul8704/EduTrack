const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema({
    username: {
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
        type: [
            {
                courseId: String,
                progress: {
                    type: Map,
                    of: Number, 
                },
                percentComplete: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        default: [],
    },
});

module.exports = mongoose.model('UserDetails', userDetailsSchema);