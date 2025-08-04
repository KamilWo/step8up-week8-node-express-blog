// Import required modules
require("dotenv").config(); // Load environment variables from .env file
const app = require("./app"); // Import the configured Express app
const config = require("./config"); // Import configuration settings
const sequelize = require("./config/sequelize");

// Use environment variable for port, with a default
const PORT = config.port;

/**
 * Starts the server after ensuring the database is connected and synchronized.
 * This is an async function to handle the promises from Sequelize.
 */
const startServer = async () => {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Sync all defined models to the database.
    // { force: false } is safe for production; it creates tables if they don't exist
    // but does not drop them. Seed script will still use { force: true }
    // to reset the database during development.
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");

    // Start listening for requests only after the database is ready
    const server = app.listen(PORT, () => {
      console.log(`\nServer is listening on port ${PORT}`);
      console.log(`Access the application at http://localhost:${PORT}`);
    });

    return server;
  } catch (error) {
    // If the database connection or sync fails, log the error and exit.
    console.error("Unable to start the server:", error);
    process.exit(1); // Exit the process with an error code
  }
};

// Execute the server start function
const server = startServer();

// Export the promise that resolves to the server instance for testing
module.exports = { server };
