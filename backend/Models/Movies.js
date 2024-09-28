const mongoose = require("mongoose");

const baseMovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "Title must be unique"],
      index: true,
    },
    poster: String,
    backdropPoster: String,
    category: {
      type: String,
      index: true,
    },
    link: String,
    image: String,
    year: String,
    video: String,
    size: String,
    synopsis: String,
    premium: {
      type: Boolean,
      default: false,
    },
    adult: Boolean,
    genreIds: [Number],
    movieId: Number,
    ratings: Number,
    releaseDate: String,
    synopsis: String,
    createdAt: { type: Date, default: Date.now },
    details: {},
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    userLikes: { type: [String], default: [] }, // Store user IDs who liked
    userDislikes: { type: [String], default: [] },
  },
  { discriminatorKey: "genre" }
); // Add a discriminator key

// Create the Base Model
const MoviesCollection = mongoose.model("MoviesCollection", baseMovieSchema);

// Define Specific Genre Schemas Using Discriminators
const actionSchema = new mongoose.Schema({});
const comedySchema = new mongoose.Schema({});
const adventureSchema = new mongoose.Schema({});
const animationSchema = new mongoose.Schema({});

const ActionMovies = MoviesCollection.discriminator("action", actionSchema);
const ComedyMovies = MoviesCollection.discriminator("comedy", comedySchema);
const AnimationMovies = MoviesCollection.discriminator(
  "animation",
  animationSchema
);
const AdventureMovies = MoviesCollection.discriminator(
  "adventure",
  adventureSchema
);

module.exports = {
  ActionMovies,
  ComedyMovies,
  AdventureMovies,
  AnimationMovies,
  MoviesCollection,
};
