const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/database");
const errorHandler = require("./middleware/error");
const newsletterRoute = require("./routes/newsletterRoute");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(
  cors({
    origin: "*",
  }),
);

app.use(fileUpload());

// Mount routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/teachers", require("./routes/teachers"));
app.use("/api/upload", require("./routes/upload"));
app.use("/api/newsletter", newsletterRoute);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "TutionMaster API is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handler middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`Backend is running ...`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", err);
  server.close(() => {
    process.exit(1);
  });
});
