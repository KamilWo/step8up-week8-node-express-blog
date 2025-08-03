// Import required modules
const express = require("express"); // For building web application
const path = require("path"); // For serving static files
const cors = require("cors"); // For frontend/backend communication in development
const session = require("express-session"); // The middleware for managing sessions in Express.
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/sequelize"); // Import the sequelize instance
const allRoutes = require("./routes"); // Import the main router
const errorHandler = require("./middleware/errorHandler"); // Global error handling middleware

// Create Express app
const app = express();

// Session Middleware Setup
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET, // A secret key for signing the session ID cookie
    store: sessionStore,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true, // Prevents client-side JS from reading the cookie
      maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 24 hours
    },
  })
);

// Sync the session store table
sessionStore.sync();

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse incoming JSON requests of content-type - application/json
app.use(express.json());

// Middleware to parse incoming URL-encoded requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "../../public")));

// Mount all routes from the main router
app.use("/", allRoutes);

// Wildcard route to handle undefined routes (404 Not Found)
// This must be placed after all other routes. Express 5.x.x has named parameter (any)
app.all("*any", (req, res) => {
  res.status(404);
  // If the request is for an API route, send JSON, otherwise let the client handle it.
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  // For non-API routes, send the main HTML file to let the client-side router work.
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

app.use(errorHandler); // Global error handling middleware (should be last)

module.exports = app;
