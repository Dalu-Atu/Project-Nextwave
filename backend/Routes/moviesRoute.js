const Express = require("express");
const {
  getSearchedMovie,
  getNewReleases,
  getMoviesByGenre,
  getMovie,
  dislikeAMovie,
  likeAMovie,
  addToWatchList,
  removeMovieFromWatchlist,
  getMovieSeries,
  downloadMovie,
} = require("../Controllers/moviesController");
const { protect } = require("../Controllers/authController");
const Router = Express.Router();

Router.use(protect);
Router.get("/new-releases", getNewReleases);
Router.get("/genre/:genre", getMoviesByGenre);
Router.get("/title/:title", getMovie);
Router.get("/search", getSearchedMovie);
Router.get("/recomendations");
Router.post("/dislike", dislikeAMovie);
Router.post("/like", likeAMovie);
Router.post("/add-to-watchlist", addToWatchList);
Router.post("/remove-from-watchlist", removeMovieFromWatchlist); // New route
Router.get("/category/:category", getMovieSeries);
Router.post("/download", downloadMovie);
module.exports = Router;
