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
  validateBody,
  validateUpdateBody,
  validateUpdateFavoriteBody,
  isValidId,
  authentificate,
} = require("../../middlewares");

const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../models/contact");

router.get("/", authentificate, getAll);

router.get("/:id", authentificate, isValidId, getContactById);

router.post("/", authentificate, validateBody(addSchema), add);

router.delete("/:id", authentificate, isValidId, deleteById);

router.put(
  "/:id",
  authentificate,
  isValidId,
  validateUpdateBody(updateSchema),
  updateById
);

router.patch(
  "/:id/favorite",
  authentificate,
  isValidId,
  validateUpdateFavoriteBody(updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
