const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/user_data');

router.route('/').get(getAllUsers);

module.exports = router;