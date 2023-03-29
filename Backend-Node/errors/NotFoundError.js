const customApiError = require('./customErrorCreator');
const { StatusCodes } = require('http-status-codes');

class NotFoundError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
