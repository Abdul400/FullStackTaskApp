const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    msg: err.message || 'Something went wrong try again later',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  if (err.code && err.code === 11000) {
    customError.msg =
      'username or email already used. Provide provide another username or email';
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === 'CastError') {
    customError.msg = `No task found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
