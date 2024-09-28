const { MoviesCollection } = require("../Models/Movies.js");
const { catchAsync, AppError } = require("../utils/catchAsync");
const { getLastAddedMovies } = require("../utils/getMovies.js");
const { getMoviesWithTrailers, getMovieTrailer } = require("../utils/tmdb.js");
const {
  generateLink,
  getMoviesDownloadLink,
} = require("../utils/getDownloadLink.js");
const Users = require("../Models/Users.js");

const getMovieInThisCategory = (movies, name, category) => {
  // Filter movies by the specified category
  const specificMovies = movies.filter((movie) => movie[category] === name);

  // Sort the movies from newest to oldest based on the createdAt date
  const sortedSpecificMovies = specificMovies.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // const reversedSpecificMovies = sortedSpecificMovies.reverse();
  const mostRecentSpecificMovies = sortedSpecificMovies.slice(0, 100);

  return mostRecentSpecificMovies;
};
const getTopRatedMoviesInCategory = (movies, name, category) => {
  // Filter movies by the specified category
  const specificMovies = movies.filter((movie) => movie[category] === name);

  // Sort the movies by rating in descending order
  const sortedSpecificMovies = specificMovies.sort(
    (a, b) => b.rating - a.rating
  );

  // Get the latest 30 movies based on the createdAt date
  const latestSpecificMovies = sortedSpecificMovies
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 100);

  return latestSpecificMovies;
};
function topPicks(movies) {
  // Filter interesting movies based on ratings and premium status
  const interestingMovies = movies.filter((movie) => {
    return movie.ratings >= 4.0 && !movie.premium && !movie.adult;
  });

  // Shuffle the array to make the recommendations less predictable
  const shuffledMovies = interestingMovies.sort(() => Math.random() - 0.5);

  // Select a limited number of movies (e.g., 5)
  return shuffledMovies.slice(0, 15);
}
const getHighestRatedMovie = (movies) => {
  if (movies.length === 0) return null;

  return movies.slice(0, 10).reduce((highestRated, currentMovie) => {
    return currentMovie.ratings > highestRated.ratings
      ? currentMovie
      : highestRated;
  });
};

exports.getNewReleases = catchAsync(async (req, res, next) => {
  //get 300 movies from the db and use it to achieve all this calculations
  const lastAddedMovie = await getLastAddedMovies();
  const mostTrendingMovie = getHighestRatedMovie(lastAddedMovie);
  const recomendedMovies = topPicks(lastAddedMovie);

  //get 30 of the latestst realeases show. movies/series.
  const newReleases = () => {
    const sortedMovies = lastAddedMovie
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 100);
    return sortedMovies;
  };

  //get 100 trending series
  const trendingSeries = getTopRatedMoviesInCategory(
    lastAddedMovie,
    "TV Series",
    "category"
  );

  //get 100 trending movies
  const trendingMovies = getTopRatedMoviesInCategory(
    lastAddedMovie,
    "International",
    "category"
  );

  //get 100  animations
  const kidsShows = getMovieInThisCategory(
    lastAddedMovie,
    "animation",
    "genre"
  );
  const upComings = await getMoviesWithTrailers();
  //get 100 upcoming movies
  // const upcomingMovies = getUpcomingMovieDetails();

  res.status(200).json({
    status: "success",
    movies: {
      newReleases: newReleases(),
      trendingSeries,
      trendingMovies,
      kidsShows,
      mostTrendingMovie,
      upComings,
      recomendedMovies,
    },
  });
});
exports.getMoviesByGenre = catchAsync(async (req, res, next) => {
  const { genre } = req.params; // Extract the genre ID from the request parameters
  const genreId = parseInt(genre, 10); // Convert the genre parameter to an integer

  const moviesInThisGenre = await MoviesCollection.find({
    genreIds: { $in: [genreId] }, // Use the $in operator to find movies that contain the genre ID
  }).limit(30); // Limit the result to a maximum of 30 movies

  if (moviesInThisGenre.length < 1) {
    return next(new AppError("There is no movie with this genre", 404));
  }

  return res.status(200).json({
    status: "success",
    movies: moviesInThisGenre,
  });
});

exports.getSearchedMovie = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  try {
    const movies = await MoviesCollection.find({
      title: new RegExp(q, "i"), // Basic regex search for debugging
    }).limit(10);

    res.status(200).json(movies);
  } catch (e) {
    next(new AppError(500, "server error"));
  }
});

exports.getMovie = catchAsync(async (req, res, next) => {
  const { title } = req.params;

  // let video;
  const movie = await MoviesCollection.findOne({ title });
  const similarMovies = await MoviesCollection.find({
    genreIds: { $in: [...movie.genreIds] }, // Use the $in operator to find movies that contain the genre ID
  });

  const data = await getMovieTrailer(movie);

  res.status(200).json({
    status: "success",
    movie: data,
    category: movie.category === "TV Series",
    similarMovies,
    // video,
  });
});

exports.likeAMovie = catchAsync(async (req, res, next) => {
  const user = req.query.user;
  const movieId = req.query.id;

  const movie = await MoviesCollection.findById(movieId);

  if (movie.userLikes.includes(user)) {
    // User already liked the movie, so remove the like
    movie.likes -= 1;
    movie.userLikes = movie.userLikes.filter((id) => id !== user);
  } else {
    // Add the like
    movie.likes += 1;
    movie.userLikes.push(user);
    // Remove dislike if it exists
    if (movie.userDislikes.includes(user)) {
      movie.dislikes -= 1;
      movie.userDislikes = movie.userDislikes.filter((id) => id !== id);
    }
  }

  await movie.save();
  res.status(200).json({
    status: "success",
    movie,
  });
});
exports.dislikeAMovie = catchAsync(async (req, res, next) => {
  const user = req.query.user;
  const movieId = req.query.id;

  const movie = await MoviesCollection.findById(movieId);

  if (movie.userDislikes.includes(user)) {
    // User already disliked the movie, so remove the dislike
    movie.dislikes -= 1;
    movie.userDislikes = movie.userDislikes.filter((id) => id !== user);
  } else {
    // Add the dislike
    movie.dislikes += 1;
    movie.userDislikes.push(user);
    // Remove like if it exists
    if (movie.userLikes.includes(user)) {
      movie.likes -= 1;
      movie.userLikes = movie.userLikes.filter((id) => id !== user);
    }
  }

  await movie.save();
  res.status(200).json({
    status: "success",
    movie,
  });
});

exports.addToWatchList = catchAsync(async (req, res, next) => {
  const userId = req.user.id; // Assuming user is authenticated and ID is available
  const movieId = req.query.id;
  // Find the user and add the movie ID to their watchlist

  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { $addToSet: { watchlist: movieId } }, // $addToSet ensures no duplicates
    { new: true }
  ).populate("watchlist");

  res.status(200).json({
    status: "success",
    message: "Movie added to watchlist",
    user: updatedUser,
  });
});

exports.removeMovieFromWatchlist = catchAsync(async (req, res, next) => {
  const userId = req.user.id; // Assuming user is authenticated and ID is available
  const movieId = req.query.id;

  // Find the user and remove the movie ID from their watchlist
  const updatedUser = await Users.findByIdAndUpdate(
    userId,
    { $pull: { watchlist: movieId } }, // $pull removes the movie ID from the array
    { new: true }
  ).populate("watchlist");

  res.status(200).json({
    status: "success",
    message: "Movie added to watchlist",
    user: updatedUser,
  });
});
exports.getMovieSeries = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  const movies = await MoviesCollection.find({ category }).limit(300);
  res.status(200).json({ status: "success", movies });
});

exports.downloadMovie = catchAsync(async (req, res, next) => {
  let downloadLink;
  const movie = req.body;

  if (movie.category === "TV Series") {
    downloadLink = await generateLink(movie.link);
  } else {
    downloadLink = await getMoviesDownloadLink(movie.link);
  }

  res.status(200).json({
    status: "success",
    link: downloadLink.videourl,
  });
});

//handle all errors on all function controllers, remove log, if necesssary throw thre error
