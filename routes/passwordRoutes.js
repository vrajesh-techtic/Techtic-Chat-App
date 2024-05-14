const express = require("express");
const {
  forgotPassword,
  validateForgotPWD,
} = require("../controllers/passwordController");
const {
  forgotPWDValidations,
  onlyPWDValidations,
} = require("../middleware/validators");
const { decryptForgotToken } = require("../helpers/tokens");

const router = express.Router();

router.post(
  "/send-forgot-password-email",
  forgotPWDValidations,
  forgotPassword
);
router.post(
  "/validate-forgot-password/:token",
  decryptForgotToken,
  onlyPWDValidations,
  validateForgotPWD
);

router.get("/forgot-password/:token", (req, res) => {
  const token = req.params.token;
  res.render("../services/email/email", { token });
});

module.exports = router;
