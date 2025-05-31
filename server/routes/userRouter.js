const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/:userid", userController.getAllCourses);
router.get("/:userid/:courseId", userController.getCourseById);
router.get(
    "/:userid/:courseId/module/:moduleNumber/:subModuleNumber",
    userController.getSubModuleByCourseId
);
router.get(
    "/:userid/:courseid/progress",
    userController.getProgressMatrixByCourseId
);
router.patch(
    "/:userid/:courseId/progress/:moduleNumber/:subModuleNumber",
    userController.updateProgress
);
router.get("/:userid/course/search", userController.searchCourse);
router.post("/:userid/:courseid/enroll", userController.enrollUserInCourse);

module.exports = router;
