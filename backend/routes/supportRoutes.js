const express = require("express");
const { createSupportTicket } = require("../controllers/supportController");
const { optionalAuth } = require("../middleware/auth");

const router = express.Router();

router.post("/tickets", optionalAuth, createSupportTicket);

module.exports = router;
