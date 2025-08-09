const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with database credentials from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DB_DIALECT || "postgres",
  // For production environments (like Render), a secure SSL connection is required.
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true, // Enforce SSL connections
            rejectUnauthorized: false, // Allow self-signed certificates
          }
        : false,
  },
  logging: false, // Set to console.log to see executed SQL queries
});

module.exports = sequelize;
