import ErrorHandler from "../utils/errorHandler.js";

const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return next(
        new ErrorHandler(error.details.map((d) => d.message).join(", "), 400)
      );
    }

    req[property] = value;
    next();
  };
};

export default validate;
