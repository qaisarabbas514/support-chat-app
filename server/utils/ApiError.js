// Error carrying an HTTP status code. Throw it anywhere; the global
// error handler turns it into a { success, message, data } response.
export default class ApiError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}
