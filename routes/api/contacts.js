const express = require("express");

const router = express.Router();

const {
  getAll,
  getContactById,
  add,
  updateById,
  updateFavorite,
  deleteById,
} = require("../../controllers/contacts");

const {
  validateAddBody,
  validateUpdateBody,
  validateUpdateFavoriteBody,
  isValidId,
} = require("../../middlewares");

const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

router.get("/", getAll);

router.get("/:id", isValidId, getContactById);

router.post("/", validateAddBody(addSchema), add);

router.delete("/:id", isValidId, deleteById);

router.put("/:id", isValidId, validateUpdateBody(updateSchema), updateById);

router.patch(
  "/:id/favorite",
  isValidId,
  validateUpdateFavoriteBody(updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
