const badRequestError = require('./badRequest');
const NotFoundError = require('./NotFoundError');
const unauthorizedError = require('./unauthorized');
const customApiError = require('./customErrorCreator');

module.exports = {
  badRequestError,
  NotFoundError,
  unauthorizedError,
  customApiError,
};
