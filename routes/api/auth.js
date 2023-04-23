const router = require("express").Router();

const { validateBody, authentificate } = require("../../middlewares");
const { authSchema } = require("../../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/auth");

router.post("/register", validateBody(authSchema), register);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authentificate, getCurrent);

router.post("/logout", authentificate, logout);

router.patch("/", authentificate, updateSubscription);

module.exports = router;
