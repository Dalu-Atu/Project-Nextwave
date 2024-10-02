const Express = require("express");
const {
  updateActionMovies,
  updateAnimationMovies,
  updateAdventureMovies,
  updateMovies,
} = require("../Controllers/cronContollers");
const Router = Express.Router();

Router.get("/update-action-movies", updateActionMovies);
Router.get("/update-animation-movies", updateAnimationMovies);
Router.get("/update-adventure-movies", updateAdventureMovies);
Router.get("/update-comedy-movies", updateAdventureMovies);
Router.get("/update-movies", updateMovies);
module.exports = Router;
