const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const adminController = require("../controllers/admin");

router.get("/", adminController.getAllUsers);
router.get("/:courseId", adminController.getUserForCourse);
router.post("/add", adminController.addNewUser);
router.get("/progress/:employeeid", adminController.getProgressByUserId);
module.exports = router;