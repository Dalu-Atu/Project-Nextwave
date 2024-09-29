const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1); // Exit the process to avoid unpredictable state
});

// Load environment variables
dotenv.config({ path: "./config.env" });

// Database connection function
(async () => {
  try {
    console.log("Attempting to connect to database...");
    await mongoose.connect(process.env.DB);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1); // Exit the process if the database fails to connect
  }
})();

// Import the Express app
const App = require("./app");

// Start the server
const port = process.env.PORT || 3000;
const server = App.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection! Shutting down...");
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1); // Gracefully shut down the server
  });
});
