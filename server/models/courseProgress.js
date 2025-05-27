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
    courseName: {
        type: String,
        required: true,
    },
    percentComplete: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model("ProgressData", courseProgressSchema);