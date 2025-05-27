const mongoose = require('mongoose');

const courseProgressSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    courseId: { 
        type: String, 
        required: true 
    },
    progress: {
        type: Map,
        of: Number,
    },
    percentComplete: {
        type: Number,
        default: 0,
    },
    enrolledAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("EnrollmentData", courseProgressSchema);