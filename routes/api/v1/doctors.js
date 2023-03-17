const express = require("express");
const router = express.Router();

const doctorsController = require("../../../controllers/api/doctors_controller");

router.post("/register", doctorsController.register);
router.post("/login", doctorsController.login);

module.exports = router;