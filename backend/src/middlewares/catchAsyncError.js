import mongoose from "mongoose";

const catchAsyncError = (fn, useTransaction = false) => {
  return async (req, res, next) => {
    if (!useTransaction) {
      return Promise.resolve(fn(req, res, next)).catch(next);
    }

    // Transaction mode
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Pass the session to the controller if needed
      await fn(req, res, next, session);

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      next(error); // Send to centralized error handler
    }
  };
};

export default catchAsyncError;
