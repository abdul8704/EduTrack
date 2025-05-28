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
    percentComplete: { // no of true/ mat.length * mat[0].length 
        type: Number,
        required: true,
    },
    moduleStatus:{
        totalSubModules: {
            type: Number,
            default: 0,
        },
        completedModules: {
            type: [[Boolean]], // row for each module, column for each submodule
            default: []
        },
    }
});

module.exports = mongoose.model("ProgressData", courseProgressSchema);