const { promisify } = require("util");
const Users = require("../Models/Users");
const { catchAsync, AppError } = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const customer = await stripe.customers.create({
    email: req.body.email,
  });

  if (!req.body.email || !req.body.password)
    return next(new AppError("Please provide email and password", 400));

  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  const createdUser = await Users.create({
    ...req.body,
    password: hashedPassword,
    stripeCustomerId: customer.id,
  });

  const newUser = await Users.findById(createdUser._id).populate(
    "subscriptionDetails"
  );

  createSendToken(newUser, 200, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // check if required details are provided
  if (!req.body.email || !req.body.password)
    next(new AppError("please provide correct email or password", 404));

  //check if the user exist
  const user = await Users.findOne({ email: req.body.email }).populate(
    "subscriptionDetails"
  );
  if (!user) next(new AppError("please provide correct details", 404));

  //check if the provided password, when hashed is thesame as the users passwod
  if (!user.validatePassword(user.password, req.body.password))
    next(new AppError("plase provide correct password", 400));

  //at this point user details are valid. we log them in
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await Users.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.isPasswordChanged(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
