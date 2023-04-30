const router = require("express").Router();

const { validateBody, authentificate, upload } = require("../../middlewares");
const { authSchema } = require("../../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/auth");

router.post("/register", validateBody(authSchema), register);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authentificate, getCurrent);

router.post("/logout", authentificate, logout);

router.patch("/", authentificate, updateSubscription);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = router;
