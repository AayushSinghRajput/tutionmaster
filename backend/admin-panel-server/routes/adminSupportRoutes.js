const express = require("express");
const {
  getAdminSupportTickets,
  getAdminSupportTicketById,
  updateAdminSupportTicketStatus,
  replyAdminSupportTicket,
} = require("../../controllers/supportController");
const { protectAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.use(protectAdmin);

router.get("/", getAdminSupportTickets);
router.get("/:id", getAdminSupportTicketById);
router.patch("/:id/status", updateAdminSupportTicketStatus);
router.post("/:id/reply", replyAdminSupportTicket);

module.exports = router;
