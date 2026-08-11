const mongoose = require("mongoose");

const courseNoteSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        courseId: {
            type: String,
            required: true,
        },
        moduleNumber: {
            type: Number,
            required: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2000,
        },
    },
    { timestamps: true }
);

// Notes are always read back for one learner on one module at a time.
courseNoteSchema.index({ userId: 1, courseId: 1, moduleNumber: 1 });

module.exports = mongoose.model("CourseNote", courseNoteSchema);
