const mongoose = require("mongoose");

const userStatsSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        totalEnrolled: {
            type: Number,
            default: 0,
        },
        totalCompleted: {
            type: Number,
            default: 0,
        },
        totalOngoing: {
            type: Number,
            default: 0,
        },
        averageProgress: {
            type: Number,
            default: 0,
        },
        learningStreak: {
            type: Number,
            default: 0,
        },
        lastActiveDate: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("UserStats", userStatsSchema);
