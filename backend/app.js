const express = require("express");
const MoviesRoute = require("./Routes/moviesRoute");
const AuthRoute = require("./Routes/authRoutes");
const SubscriptionRoute = require("./Routes/subscriptionRoute");
const CronRoute = require("./Routes/cronRoutes");
const cors = require("cors");
const cron = require("node-cron");
const globalErrorHandler = require("./utils/globalErrorHandler");
const helmet = require("helmet");

const {
  updateActionMovies,
  updateAdventureMovies,
  updateAnimationMovies,
  updateComedyMovies,
} = require("./Controllers/cronContollers");

const App = new express();
App.use(express.json());

const corsOptions = {
  origin: "*", // For testing only
  optionsSuccessStatus: 200, // For legacy browser support
};

// Use CORS middleware
App.use(cors(corsOptions));
App.options("*", cors(corsOptions)); // Enable pre-flight across-the-board

// Add your routes
App.use("/api/v1/cron", CronRoute);
App.use("/api/v1/subscription", SubscriptionRoute);
App.use("/api/v1/auth", AuthRoute);
App.use("/api/v1/movies", MoviesRoute);
App.use("/api/v1/users", MoviesRoute);

App.use(globalErrorHandler);

module.exports = App;
