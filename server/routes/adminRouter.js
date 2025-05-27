const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const adminController = require("../controllers/admin");

router.get("/", adminController.getAllUsers);


module.exports = router;