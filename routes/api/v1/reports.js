const express = require("express");
const router = express.Router();

const reportsController = require("../../../controllers/api/reports_controllers");

router.get("/:status", reportsController.reports);

module.exports = router;