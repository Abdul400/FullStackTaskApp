const customApiError = require('./customErrorCreator');
const { StatusCodes } = require('http-status-codes');

class badRequestError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = badRequestError;
