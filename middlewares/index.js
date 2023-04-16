const { validateAddBody } = require("./validateBody");
const { validateUpdateBody } = require("./validateBody");
const { validateUpdateFavoriteBody } = require("./validateBody");
const isValidId = require("./isValidId");
module.exports = {
  validateAddBody,
  validateUpdateBody,
  validateUpdateFavoriteBody,
  isValidId,
};
