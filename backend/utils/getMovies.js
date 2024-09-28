const { MoviesCollection } = require("../Models/Movies");
const { getEpisodes } = require("./getDownloadLink");
const getMovieArticles = require("./getMovieArticles");
const { getMovieDetails } = require("./tmdb");

const rateMovie = (averageVote) => {
  // Ensure the vote is a number
  if (typeof averageVote !== "number" || isNaN(averageVote)) {
    averageVote = 5; // Default value if input is not a valid number
  }

  // Ensure the vote is within the expected range
  if (averageVote < 1 || averageVote > 10) {
    averageVote = 7; // Default value if input is outside the expected range
  }

  // Normalize the average vote to a scale of 0.5 to 5
  const normalizedRating = (averageVote / 1.7).toFixed(1);

  return parseFloat(normalizedRating);
};

const getMovies = async (dest, model) => {
  const articlesData = await getMovieArticles(dest);

  const moviesWithDetails = await Promise.all(
    articlesData.map(async (mov) => {
      const details = await getMovieDetails(mov, "");
      const {
        adult,
        genre_ids,
        id,
        vote_average,
        release_date,
        backdrop_path,
        poster_path,
        overview,
      } = details.results[0] || {};

      return {
        ...mov,
        adult: adult || false,
        genreIds: genre_ids || [],
        movieId: id || "",
        releaseDate: release_date || "",
        ratings: rateMovie(vote_average),
        poster: poster_path || "",
        backdropPoster: backdrop_path || "",
        synopsis: overview || "",
      };
    })
  );
  console.log(`moviesWithDetails:${moviesWithDetails.length}`);

  for (const mov of moviesWithDetails) {
    if (mov.category === "TV Series") {
      const details = await getEpisodes(mov.link);
      await model.create({
        ...mov,
        details,
      });
    } else {
      await model.create({
        ...mov,
      });
    }
  }
  return moviesWithDetails;
};

const getLastAddedMovies = async (limit = 300) => {
  // Find the last added movies, sorted by creation date in descending order
  const movies = await MoviesCollection.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .exec();

  return movies;
};

module.exports = {
  getMovies,
  getLastAddedMovies,
};
