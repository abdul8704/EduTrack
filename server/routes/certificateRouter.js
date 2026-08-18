// backend/routes/certificateRoutes.js
const express = require("express");
const router = express.Router();
const {
    generateCertificate,
    generateMonthlyLearningReport,
} = require("../controllers/certificate");

const reportRateLimitStore = new Map();

const reportRateLimiter = (req, res, next) => {
    const key = `${req.ip}:${req.path}`;
    const now = Date.now();
    const windowMs = 60 * 1000;
    const maxRequests = 20;
    const entry = reportRateLimitStore.get(key);

    if (!entry || now >= entry.resetAt) {
        reportRateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
        return next();
    }

    if (entry.count >= maxRequests) {
        return res.status(429).json({
            message: "Too many requests. Please try again shortly.",
        });
    }

    entry.count += 1;
    return next();
};

router.post("/", generateCertificate);
router.get("/monthly/:userid", reportRateLimiter, generateMonthlyLearningReport);

module.exports = router;
