const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const adminController = require("../controllers/admin");

router.get("/:userid", adminController.getAllUsers);
router.get("/:userid/:courseId", adminController.getUserForCourse);
router.post("/:userid/add", adminController.addNewUser);
router.get("/:userid/progress/:employeeid", adminController.getProgressByUserId);
module.exports = router;