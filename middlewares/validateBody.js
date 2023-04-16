const { HttpError } = require("../helpers");
const validateAddBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(400, `missing required ${error.details[0].context.key} field`)
      );
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
  validateAddBody,
  validateUpdateBody,
  validateUpdateFavoriteBody,
};
