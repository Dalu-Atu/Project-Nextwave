const { AppError } = require("./catchAsync");

const handleDuplicacyError = () => {
  const message = "Email already exist";
  return new AppError(message, 400);
};

const globalErrorHandler = (err, req, res, next) => {
  if (err.code === 11000) err = handleDuplicacyError(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorHandler;
