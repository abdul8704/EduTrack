const router = require("express").Router();
const loginController = require("../controllers/login");

const {
    sendOTPController,
    verifyOTPController,
} = require("../controllers/otpAuth");

router.post("/signup/newuser", loginController.signupValidation);
router.post("/signup/check", loginController.checkExistingUser);

router.post("/signup/send-otp", sendOTPController);
router.post("/signup/verify-otp", verifyOTPController);
router.post("/existinguser", loginController.loginValidation);

router.post("/forgot-password/send-otp", sendOTPController);
router.post("/forgot-password/verify-otp", verifyOTPController);
router.post(
    "/forgot-password/reset-password",
    loginController.resetUserPassword
);

module.exports = router;
