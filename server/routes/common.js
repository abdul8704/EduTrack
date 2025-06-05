const express = require("express");
const router = express.Router();
const cont = require("../controllers/common");

router.get("/profile/role/:userid", cont.getRole);

module.exports = router;
