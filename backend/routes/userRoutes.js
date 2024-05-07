const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const {
  signUpValidation,
  loginValidations,
  updateValidations,
} = require("../middleware/validators");
const { authenticate } = require("../middleware/authentication");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API working !!");
});

router.get("/validate-token", async (req, res) => {
  res.send(authenticate(req));
});

router.post("/signup", signUpValidation, createUser);
router.post("/login", loginValidations, loginUser);
router.post("/update-user", authenticate, updateValidations, updateUser);

module.exports = router;
