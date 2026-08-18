// backend/routes/certificateRoutes.js
const express = require("express");
const router = express.Router();
const {
    generateCertificate,
    generateMonthlyLearningReport,
} = require("../controllers/certificate");

router.post("/", generateCertificate);
router.get("/monthly/:userid", generateMonthlyLearningReport);

module.exports = router;
