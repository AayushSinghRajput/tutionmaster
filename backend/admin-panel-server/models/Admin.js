const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || "aayusinghrajput812@gmail.com";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure super admin email cannot be changed via the model
adminSchema.pre("save", function (next) {
  if (
    this.isModified("isSuperAdmin") &&
    !this.isSuperAdmin &&
    this.email === SUPER_ADMIN_EMAIL
  ) {
    return next(new Error("Cannot remove Super Admin privileges from the root administrator"));
  }
  next();
});

// Instance method: compare plain-text password against stored hash
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

// Static helper to hash a password
adminSchema.statics.hashPassword = async function (plainText) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainText, salt);
};

adminSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Admin", adminSchema);
