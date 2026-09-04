const SupportTicket = require("../../../models/SupportTicket");

const createSupportTicket = {
  definition: {
    name: "createSupportTicket",
    description:
      "Submit a customer support request or escalation on behalf of a user when they need human staff help, report a profile issue, or request assistance.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "User's full name.",
        },
        category: {
          type: "string",
          enum: ["Profile Setup", "Job Vacancy", "Technical Support", "General"],
          description: "Category of the support inquiry.",
        },
        contactEmail: {
          type: "string",
          description: "User's email address for receiving support updates.",
        },
        contactPhone: {
          type: "string",
          description: "User's phone number.",
        },
        message: {
          type: "string",
          description: "Detailed description of the support issue or request.",
        },
      },
      required: ["message"],
    },
  },
  requiresAuth: false,
  async execute(args, context) {
    const email = args.contactEmail || (context.user ? context.user.email : "guest@tuitionmaster.guru");
    const name = args.name || (context.user ? context.user.username : "Guest User");
    const phone = args.contactPhone || "";
    const category = args.category || "General";

    // Auto-generate human readable ticket ID like TM-7482
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `TM-${randomNum}`;

    const record = await SupportTicket.create({
      ticketId,
      name,
      contactEmail: email,
      contactPhone: phone,
      category,
      subject: `[Support Request] - ${category}`,
      message: args.message,
      status: "Open",
      userId: context.user ? context.user._id : null,
    });

    return {
      forModel: {
        success: true,
        ticketId: record.ticketId,
        message: `Support ticket ${record.ticketId} issued successfully. Our team will review it and reply soon.`,
      },
      publicResults: [
        {
          type: "support_ticket",
          _id: record._id,
          ticketId: record.ticketId,
          name: record.name,
          email: record.contactEmail,
          phone: record.contactPhone,
          category: record.category,
          message: record.message,
          status: record.status,
          createdAt: record.createdAt,
        },
      ],
    };
  },
};

module.exports = { createSupportTicket };
