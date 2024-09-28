// /api/login.js
const Users = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { createSendToken } = require("../utils/authUtils");
const bcrypt = require("bcryptjs");

module.exports = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 404));
  }

  const user = await Users.findOne({ email });
  if (!user) return next(new AppError("Invalid email or password", 404));

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return next(new AppError("Invalid password", 400));

  createSendToken(user, 200, res);
});
