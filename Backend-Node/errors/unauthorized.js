const customApiError = require('./customErrorCreator');
const { StatusCodes } = require('http-status-codes');
class unauthorizedError extends customApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = unauthorizedError;
