import env from "../config/env.js";
import { sendError } from "../utils/apiResponse.js";

// 404 for any route that did not match
export const notFound = (req, res) =>
  sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);

// Global error handler (must have 4 args so Express recognises it).
// Express 5 forwards rejected promises from async handlers here automatically.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let data = err.details || null;

  // Mongoose: invalid ObjectId
  if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}`;
  }
  // Mongoose: schema validation failed
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
    data = Object.values(err.errors).map((e) => ({ field: e.path, message: e.message }));
  }
  // Mongo duplicate key (e.g. email already registered)
  if (err.code === 11000) {
    status = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `${field} already exists`;
  }
  // Malformed JSON body
  if (err.type === "entity.parse.failed") {
    status = 400;
    message = "Invalid JSON body";
  }

  if (status >= 500) console.error(err);
  // Never leak internals of unexpected errors in production
  if (status >= 500 && env.nodeEnv === "production") message = "Internal server error";

  return sendError(res, message, status, data);
};
