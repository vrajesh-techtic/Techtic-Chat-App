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

router.post("/forgot-password", forgotPWDValidations, forgotPassword);
router.post(
  "/validate-forgot-password/:token",
  decryptForgotToken,
  onlyPWDValidations,
  //   forgotPWDValidations,
  validateForgotPWD
);

module.exports = router;
