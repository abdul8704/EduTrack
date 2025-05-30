const router = require('express').Router();
const loginController = require('../controllers/login');

router.post("/existinguser", loginController.loginValidation);
router.post("/signup", loginController.signupValidation);

module.exports = router;