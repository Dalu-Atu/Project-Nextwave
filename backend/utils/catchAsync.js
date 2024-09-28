const catchAsync = (fn) => {
  return (req, rex, next) => {
    fn(req, rex, next).catch((err) => next(err));
  };
};

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperaitional = true;
  }
}

module.exports = {
  catchAsync,
  AppError,
};
