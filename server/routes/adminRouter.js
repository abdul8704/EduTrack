const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const adminController = require("../controllers/admin");

router.get("/:adminid/userdata/:userid", adminController.getUserById);
router.get("/:adminid/:courseId", userController.getCourseById);
router.get("/:adminid/", adminController.getAllUsers);
router.get("/:adminid/allusers/:courseId", adminController.getUserForCourse);
router.post("/:adminid/add", adminController.addNewUser);
router.get(
    "/:adminid/progress/:employeeid",
    adminController.getProgressByUserId
);
router.patch(
    "/:adminid/updateuserrole",
    adminController.updateUserRole
);
module.exports = router;
