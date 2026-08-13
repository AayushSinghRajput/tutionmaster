// One-off CLI to promote an existing user to the 'admin' role.
// Usage: node scripts/createAdmin.js someone@example.com
require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/database');
const User = require('../models/User');
const logger = require('../utils/logger');

async function main() {
  const email = process.argv[2];
  if (!email) {
    logger.error('Usage: node scripts/createAdmin.js <email>');
    process.exit(1);
  }

  await connectDB();

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    logger.error(`No user found with email ${email}`);
    await mongoose.connection.close();
    process.exit(1);
  }

  user.role = 'admin';
  await user.save();

  logger.info(`${user.email} is now an admin.`);
  await mongoose.connection.close();
  process.exit(0);
}

main().catch(async (err) => {
  logger.error(`Failed to promote user: ${err.message}`);
  await mongoose.connection.close();
  process.exit(1);
});
