// This file acts as a central point for managing all the application routes.
// It can include both API routes and any general web routes (if we had them).

const express = require("express");
const path = require("path");
const router = express.Router();
const sequelize = require("../config/sequelize"); // Connect to the database for health check
const postsApiRoutes = require("./api/posts"); // Import API routes
const authApiRoutes = require("./api/auth");
const categoryApiRoutes = require("./api/categories");

// --- Health Check Route ---
router.get("/healthz", async (req, res) => {
  try {
    // Use sequelize.authenticate() for a robust health check.
    // This is the standard way to verify the database connection with Sequelize.
    await sequelize.authenticate();
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    // 503 Service Unavailable is the standard code for a failed health check
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

// Mount API routes under a specific prefixes
router.use("/api/auth", authApiRoutes);
router.use("/api/posts", postsApiRoutes);
router.use("/api/categories", categoryApiRoutes);

// A simple welcome route for the root API path
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Blog API." });
});

// --- Static Page Routes ---

// Define the path to the public directory
const publicPath = path.join(__dirname, "../../../public");

router.get("/about", (req, res) => {
  res.sendFile(path.join(publicPath, "about.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(publicPath, "contact.html"));
});

router.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(publicPath, "privacy-policy.html"));
});

router.get("/terms-and-conditions", (req, res) => {
  res.sendFile(path.join(publicPath, "terms-and-conditions.html"));
});

module.exports = router;
