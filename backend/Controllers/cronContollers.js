const {
  ActionMovies,
  AdventureMovies,
  AnimationMovies,
  ComedyMovies,
  MoviesCollection,
} = require("../Models/Movies");
const { AppError, catchAsync } = require("../utils/catchAsync");
const { getMovies } = require("../utils/getMovies");

exports.updateActionMovies = catchAsync(async (req, res, next) => {
  const data = await getMovies(
    `${process.env.NKIRI}/tag/action/`,
    ActionMovies
  );

  if (!data) return next(new AppError("Something went wrong", 404));
  console.log({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
  return res.status(200).json({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
});

exports.updateAdventureMovies = catchAsync(async (req, res, next) => {
  const data = await getMovies(
    `${process.env.NKIRI}/tag/adventure/`,
    AdventureMovies
  );
  if (!data) return next(new AppError("Something went wrong", 404));
  console.log({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
  return res.status(200).json({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
});

exports.updateAnimationMovies = catchAsync(async (req, res, next) => {
  const data = await getMovies(
    `${process.env.NKIRI}/tag/animation/`,
    AnimationMovies
  );
  if (!data) return next(new AppError("Something went wrong", 404));
  console.log({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
  return res.status(200).json({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
});
exports.updateComedyMovies = catchAsync(async (req, res, next) => {
  const data = await getMovies(
    `${process.env.NKIRI}/tag/comedy/`,
    ComedyMovies
  );
  if (!data) return next(new AppError("Something went wrong", 404));
  console.log({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
  return res.status(200).json({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
});

exports.updateMovies = catchAsync(async (req, res, next) => {
  const data = await getMovies(
    `${process.env.NKIRI}/category/international/`,
    MoviesCollection
  );
  if (!data) return next(new AppError("Something went wrong", 404));
  console.log({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
  return res.status(200).json({
    status: "success",
    count: `${data.length} Movies`,
    movies: data,
  });
});
