const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/:userid", userController.getAllCourses);
router.get("/:userid/:courseId", userController.getCourseById);
router.get(
    "/:userid/:courseId/module/:moduleNumber",
    userController.getModuleByCourseId
);

module.exports = router;
