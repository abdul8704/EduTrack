const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/:userId', userController.getAllCourses);
router.get('/:courseId', userController.getCourseById);
router.get('/:courseId/module/:moduleNumber', userController.getModuleByCourseId);


module.exports = router;