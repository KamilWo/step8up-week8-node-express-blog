const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with database credentials from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  // For production environments (like Render), a secure SSL connection is required.
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  logging: false, // Set to console.log to see executed SQL queries
});

module.exports = sequelize;
