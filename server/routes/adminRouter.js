const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const adminController = require("../controllers/admin");

router.get("/", adminController.getAllUsersProgress);
router.get("/:courseId", adminController.getUserForCourse);
router.post("/add", adminController.addNewUser);
router.get("/")

module.exports = router;