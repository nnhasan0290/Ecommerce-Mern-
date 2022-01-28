const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //Wrong MOngodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  // Mongoose duplicate key
  if (err.code === 1100) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  //Wrong JWT token
  if (err.name == "jsonwebTokenError") {
    const message = `Json Web Token invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT expire error
  if (err.name === "jsonExpireError") {
    const message = `Json Web Token is Expired , try again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
