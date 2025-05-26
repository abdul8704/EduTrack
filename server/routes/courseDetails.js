const express = require('express');
const router = express.Router();

const { getAllCourses } = require('../controllers/courses');

router.route('/').get(getAllCourses);


module.exports = router;