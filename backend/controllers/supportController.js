const SupportTicket = require("../models/SupportTicket");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Create a new support ticket (public / user)
// @route   POST /api/support/tickets
// @access  Public
exports.createSupportTicket = asyncHandler(async (req, res, next) => {
  const { name, contactEmail, contactPhone, category, subject, message } = req.body;

  if (!name || !contactEmail || !subject || !message) {
    return next(new ErrorResponse("Please provide name, contactEmail, subject, and message", 400));
  }

  // Generate unique human readable ticket ID like TM-1092
  let ticketId = `TM-${Math.floor(1000 + Math.random() * 9000)}`;
  let exists = await SupportTicket.findOne({ ticketId });
  while (exists) {
    ticketId = `TM-${Math.floor(1000 + Math.random() * 9000)}`;
    exists = await SupportTicket.findOne({ ticketId });
  }

  const ticket = await SupportTicket.create({
    ticketId,
    name,
    contactEmail,
    contactPhone: contactPhone || "",
    category: category || "General",
    subject,
    message,
    status: "Open",
    userId: req.user ? req.user._id : null,
  });

  res.status(201).json({
    success: true,
    message: "Support ticket submitted successfully",
    data: ticket,
  });
});

// @desc    Get all support tickets (admin)
// @route   GET /api/admin/support-tickets
// @access  Private (Admin)
exports.getAdminSupportTickets = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, category, search } = req.query;

  const query = {};

  if (status && status !== "All") {
    query.status = status;
  }

  if (category && category !== "All") {
    query.category = category;
  }

  if (search && search.trim()) {
    const s = search.trim();
    query.$or = [
      { ticketId: { $regex: s, $options: "i" } },
      { name: { $regex: s, $options: "i" } },
      { contactEmail: { $regex: s, $options: "i" } },
      { subject: { $regex: s, $options: "i" } },
    ];
  }

  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
  const total = await SupportTicket.countDocuments(query);
  const tickets = await SupportTicket.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit, 10))
    .lean();

  res.status(200).json({
    success: true,
    count: tickets.length,
    total,
    totalPages: Math.ceil(total / parseInt(limit, 10)),
    page: parseInt(page, 10),
    data: tickets,
  });
});

// @desc    Get single support ticket (admin)
// @route   GET /api/admin/support-tickets/:id
// @access  Private (Admin)
exports.getAdminSupportTicketById = asyncHandler(async (req, res, next) => {
  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) {
    return next(new ErrorResponse("Support ticket not found", 404));
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
});

// @desc    Update support ticket status (admin)
// @route   PATCH /api/admin/support-tickets/:id/status
// @access  Private (Admin)
exports.updateAdminSupportTicketStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (!["Open", "In Progress", "Resolved", "Closed"].includes(status)) {
    return next(new ErrorResponse("Invalid status value", 400));
  }

  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) {
    return next(new ErrorResponse("Support ticket not found", 404));
  }

  ticket.status = status;
  await ticket.save();

  res.status(200).json({
    success: true,
    message: `Ticket status updated to ${status}`,
    data: ticket,
  });
});

// @desc    Send admin reply to support ticket (admin)
// @route   POST /api/admin/support-tickets/:id/reply
// @access  Private (Admin)
exports.replyAdminSupportTicket = asyncHandler(async (req, res, next) => {
  const { replyMessage, status } = req.body;

  if (!replyMessage || !replyMessage.trim()) {
    return next(new ErrorResponse("Reply message is required", 400));
  }

  const ticket = await SupportTicket.findById(req.params.id);

  if (!ticket) {
    return next(new ErrorResponse("Support ticket not found", 404));
  }

  ticket.adminReply = {
    message: replyMessage.trim(),
    repliedAt: new Date(),
    repliedBy: req.admin ? req.admin.name : "Admin",
  };
  ticket.status = status || "Resolved";
  await ticket.save();

  res.status(200).json({
    success: true,
    message: "Reply recorded and ticket status updated successfully",
    data: ticket,
  });
});
