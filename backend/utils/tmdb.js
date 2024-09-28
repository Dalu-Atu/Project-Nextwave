const axios = require("axios");

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
  },
};

exports.getMovieDetails = async (movie) => {
  let title = movie.title;

  // Remove season number (e.g., S01, S02) from the title if the movie is not international
  if (movie.category !== "International") {
    title = title.replace(/\s*S\d{2}$/i, ""); // Remove trailing season info like ' S01'
  }

  const encodedTitle = encodeURIComponent(title);
  const year = movie.year;

  // Correctly format the URL with query parameters
  let url;
  if (movie.category === "International") {
    url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&include_adult=true&language=en-US&page=1&year=${year}`;
  } else {
    url = `https://api.themoviedb.org/3/search/tv?query=${encodedTitle}&include_adult=false&language=en-US&page=1`;
  }

  const res = await axios.get(url, options);
  return res.data;
};

exports.getMoviesWithTrailers = async (movies) => {
  try {
    // Step 1: Get the list of upcoming movies
    const upcomingMoviesRes = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming`,
      options
    );

    const data = movies || upcomingMoviesRes.data.results;
    // Step 2: Fetch trailers for each movie
    const moviesWithTrailers = await Promise.all(
      data.map(async (movie) => {
        const trailerRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          options
        );

        const trailers = trailerRes.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        return {
          ...movie,
          trailers,
        };
      })
    );

    return moviesWithTrailers;
  } catch (error) {
    console.error("Error fetching upcoming movies or trailers:", error.message);
    throw error;
  }
};

exports.getMovieTrailer = async (movie) => {
  try {
    // Fetch trailers for the provided movie
    let trailerRes;
    if (movie.category === "TV Series") {
      trailerRes = await axios.get(
        `https://api.themoviedb.org/3/tv/${movie.movieId}/videos`,
        options
      );
    } else {
      trailerRes = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.movieId}/videos`,
        options
      );
    }

    const trailers = trailerRes.data.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    return {
      ...movie,
      trailer: trailers[0],
    };
  } catch (error) {
    console.error("Error fetching trailers:", error.message);
    throw error;
  }
};
