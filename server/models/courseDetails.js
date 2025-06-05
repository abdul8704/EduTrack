const mongoose = require("mongoose");

const courseDetailsSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        required: true,
    },
    courseCompletions: {
        type: Number,
        default: 0,
    },
    courseRating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    courseInstructor: {
        type: String,
        required: true,
    },
    courseImage: {
        type: String,
        default: "https://example.com/default-course-image.jpg", // Placeholder image URL
    },
    tags: {
        type: [String],
        required: true,
        default: [],
    },
    courseIntroVideo: {
        videoTitle: { type: String, required: true },
        videoUrl: { type: String, required: true },
    },
});

module.exports = mongoose.model("CourseDetails", courseDetailsSchema);
