const error = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Something went wrong, please try again later.";

  // ===== Server-side Logging =====
  console.error("=== ERROR LOG START ===");
  console.error(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
  );
  console.error(`Status Code: ${statusCode}`);
  console.error("Error Message:", err.message);
  if (err.stack) console.error("Stack Trace:", err.stack);
  console.error("=== ERROR LOG END ===\n");

  let finalStatusCode = statusCode;
  let finalMessage = message;

  if (err.name === "ValidationError") {
    finalStatusCode = 400;
    finalMessage = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  if (err.code === 11000) {
    finalStatusCode = 400;
    const field = Object.keys(err.keyValue).join(", ");
    finalMessage = `Duplicate value entered for ${field}. Please use another value.`;
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    finalStatusCode = 400;
    finalMessage = `Invalid ${err.path} value: ${err.value}`;
  }

  if (err.name === "JsonWebTokenError") {
    finalStatusCode = 401;
    finalMessage = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    finalStatusCode = 401;
    finalMessage = "Your token has expired. Please log in again.";
  }

  res.status(finalStatusCode).json({
    success: false,
    message: finalMessage,
  });
};

export default error;
