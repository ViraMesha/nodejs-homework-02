const express = require("express");

const router = express.Router();

const {
  getAll,
  getContactById,
  add,
  updateById,
  deleteById,
} = require("../../controllers/contacts");

const { validateAddBody, validateUpdateBody } = require("../../middlewares");

const { addSchema, updateSchema } = require("../../schemas/contacts");

router.get("/", getAll);

router.get("/:id", getContactById);

router.post("/", validateAddBody(addSchema), add);

router.delete("/:id", deleteById);

router.put("/:id", validateUpdateBody(updateSchema), updateById);

module.exports = router;
