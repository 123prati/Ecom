function notFound(req, res, next) {
  const error = new Error(`Not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(error, _req, res, _next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const duplicateEmail = error.code === 11000 && error.keyPattern?.email;

  res.status(duplicateEmail ? 409 : statusCode).json({
    message: duplicateEmail ? "An account with this email already exists." : error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
}

module.exports = { notFound, errorHandler };
