const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      next(HttpError(400, `${error.details[0].message}`));
    }
    next();
  };
  return func;
};

const validateEmail = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(error);
    if (error) {
      next(HttpError(400, "missing required field email"));
    }
    next();
  };
  return func;
};

const validateUpdateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing fields"));
    }
    next();
  };
  return func;
};

const validateUpdateFavoriteBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "missing field favorite"));
    }
    next();
  };
  return func;
};

module.exports = {
  validateBody,
  validateEmail,
  validateUpdateBody,
  validateUpdateFavoriteBody,
};
