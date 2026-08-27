#!/usr/bin/env node
/**
 * One-time Super Admin seed script.
 *
 * Usage:
 *   ADMIN_PASSWORD=<yourPassword> node backend/admin-panel-server/scripts/seedSuperAdmin.js
 *
 * If the Super Admin already exists the script is idempotent (no-op).
 * The password is taken from the ADMIN_PASSWORD env variable or the
 * first CLI argument.  NEVER hard-code a password here.
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../../../backend/.env") });

const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const SUPER_ADMIN_EMAIL =
  process.env.SUPER_ADMIN_EMAIL || "aayusinghrajput812@gmail.com";
const SUPER_ADMIN_NAME = process.env.SUPER_ADMIN_NAME || "Aayush Singh";
const password = process.env.ADMIN_PASSWORD || process.argv[2];

if (!password) {
  console.error(
    "ERROR: Provide the Super Admin password via ADMIN_PASSWORD env var or as the first CLI argument."
  );
  process.exit(1);
}

async function main() {
  const isDocker = process.env.DOCKER === "true";
  const isProduction = process.env.NODE_ENV === "production";

  let dbUri;
  if (isProduction || process.env.MONGODB_URI) {
    // Use Atlas / production URI when available (including local dev with Atlas)
    dbUri = process.env.MONGODB_URI;
  } else if (isDocker) {
    dbUri = process.env.MONGODB_URI_DOCKER || "mongodb://mongo:27017/tutionmaster";
  } else {
    dbUri = process.env.MONGODB_URI_LOCAL || "mongodb://127.0.0.1:27017/tutionmaster";
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(dbUri);
  console.log("Connected.");

  const existing = await Admin.findOne({ email: SUPER_ADMIN_EMAIL });
  if (existing) {
    console.log(`Super Admin already exists: ${SUPER_ADMIN_EMAIL}`);
    await mongoose.disconnect();
    return;
  }

  const passwordHash = await Admin.hashPassword(password);

  await Admin.create({
    name: SUPER_ADMIN_NAME,
    email: SUPER_ADMIN_EMAIL,
    passwordHash,
    isSuperAdmin: true,
    isActive: true,
  });

  console.log(`✅  Super Admin created: ${SUPER_ADMIN_EMAIL}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
