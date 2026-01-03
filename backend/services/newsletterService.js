const Newsletter = require("../models/Newsletter");

exports.saveEmail = async (email) => {
  // Check if email already exists
  const existing = await Newsletter.findOne({ email });
  if (existing) {
    return { exists: true };
  }

  // Save new email
  await Newsletter.create({ email });
  return { exists: false };
};
