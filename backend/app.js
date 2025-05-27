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
  updateMovies,
  updateAdventureMovies,
  updateAnimationMovies,
  updateComedyMovies,
} = require("./Controllers/cronContollers");

const App = express();
App.use(express.json());
App.use(helmet());

const corsOptions = {
  origin: "*", // For testing only
  optionsSuccessStatus: 200, // For legacy browser support
};

// CORS middleware
App.use(cors(corsOptions));
App.options("*", cors(corsOptions));

// Routes
App.use("/api/v1/cron", CronRoute);
App.use("/api/v1/subscription", SubscriptionRoute);
App.use("/api/v1/auth", AuthRoute);
App.use("/api/v1/movies", MoviesRoute);
App.use("/api/v1/users", MoviesRoute);

App.use(globalErrorHandler);

// === CRON JOBS: Run once daily, each at a different time ===

// At 02:00 AM
cron.schedule("0 2 * * *", updateMovies);

// At 03:00 AM
cron.schedule("0 3 * * *", updateActionMovies);

// At 04:00 AM
cron.schedule("0 4 * * *", updateAdventureMovies);

// At 05:00 AM
cron.schedule("0 5 * * *", updateAnimationMovies);

// At 06:00 AM
cron.schedule("0 6 * * *", updateComedyMovies);

// ==========================

module.exports = App;
