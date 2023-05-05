const router = require("express").Router();

const {
  validateBody,
  validateEmail,
  authentificate,
  upload,
} = require("../../middlewares");
const { authSchema, emailSchema } = require("../../models/user");

const {
  register,
  verification,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  resendVerifyEmail,
} = require("../../controllers/auth");

router.post("/register", validateBody(authSchema), register);

router.get("/verify/:verificationToken", verification);

router.post("/verify", validateEmail(emailSchema), resendVerifyEmail);

router.post("/login", validateBody(authSchema), login);

router.get("/current", authentificate, getCurrent);

router.post("/logout", authentificate, logout);

router.patch("/", authentificate, updateSubscription);

router.patch("/avatars", authentificate, upload.single("avatar"), updateAvatar);

module.exports = router;
