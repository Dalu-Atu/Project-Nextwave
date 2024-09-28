const express = require("express");
const MoviesRoute = require("./Routes/moviesRoute");
const AuthRoute = require("./Routes/authRoutes");
const SubscriptionRoute = require("./Routes/subscriptionRoute");
const CronRoute = require("./Routes/cronRoutes");
const cors = require("cors");
const cron = require("node-cron");
const globalErrorHandler = require("./utils/globalErrorHandler");

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
// (async function () {
//   await MoviesCollection.deleteMany();
// })();

//cron jobs
const scheduleMovieUpdates = () => {
  console.log("Starting movie updates...");

  // First call - updateActionMovies
  cron.schedule("0 9,15,21 * * *", () => {
    console.log("Running Action Movies Update...");
    updateActionMovies();
  });

  // Second call - updateAdventureMovies (10 minutes later)
  cron.schedule("10 9,15,21 * * *", () => {
    console.log("Running Adventure Movies Update...");
    updateAdventureMovies();
  });

  // Third call - updateAnimationMovies (20 minutes later)
  cron.schedule("20 9,15,21 * * *", () => {
    console.log("Running Animation Movies Update...");
    updateAnimationMovies();
  });

  // Fourth call - updateComedyMovies (30 minutes later)
  cron.schedule("30 9,15,21 * * *", () => {
    console.log("Running Comedy Movies Update...");
    updateComedyMovies();
  });
};

scheduleMovieUpdates();

App.use("/api/v1/cron", CronRoute);
App.use("/api/v1/subscription", SubscriptionRoute);
App.use("/api/v1/auth", AuthRoute);
App.use("/api/v1/movies", MoviesRoute);
App.use("/api/v1/users", MoviesRoute);

App.use(globalErrorHandler);

module.exports = App;
