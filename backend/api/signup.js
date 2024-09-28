// /api/signup.js
const Users = require("../models/userModel"); // Assuming your user model is here
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bcrypt = require("bcryptjs");
const { createSendToken } = require("../utils/authUtils"); // Import utility function

module.exports = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const customer = await stripe.customers.create({ email });

  const hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = await Users.create({
    ...req.body,
    password: hashedPassword,
    stripeCustomerId: customer.id,
  });

  const newUser = await Users.findById(createdUser._id).populate("watchlist");

  createSendToken(newUser, 200, res);
});
