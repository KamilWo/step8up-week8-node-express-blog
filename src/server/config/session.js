// Import required modules
require("dotenv").config();
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./sequelize");

// Create the session store using the sequelize instance
const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "sessions",
  // The interval at which to clean-up expired sessions in milliseconds.
  checkExpirationInterval: 15 * 60 * 1000,
  // The maximum age (in milliseconds) of a valid session.
  expiration: 24 * 60 * 60 * 1000,
});

// Sync the session store table with the database
sessionStore.sync();

// Export the configured session middleware
module.exports = session({
  // A secret key for signing the session ID cookie.
  // It's crucial this is stored in an environment variable and not hardcoded.
  secret:
    process.env.SESSION_SECRET ||
    "a-very-long-and-super-secret-string-for-sessions",
  // Don't save session if unmodified
  resave: false,
  // Don't create a session until something is stored
  saveUninitialized: false,
  // Use Sequelize to store session data
  store: sessionStore,
  cookie: {
    // Prevents client-side JS from reading the cookie
    httpOnly: true,
    // Use secure cookies in production (requires HTTPS)
    secure: process.env.NODE_ENV === "production",
    // Specifies how cookies are sent with cross-site requests.
    sameSite: "lax",
    // Cookie expires in 24 hours
    maxAge: 24 * 60 * 60 * 1000,
  },
});
