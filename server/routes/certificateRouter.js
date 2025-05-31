// backend/routes/certificateRoutes.js
const express = require('express');
const router = express.Router();
const { generateCertificate } = require('../controllers/certificate');

router.post('/', generateCertificate);

module.exports = router;
