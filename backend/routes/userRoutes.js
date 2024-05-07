const express = require("express");
const { createUser, loginUser } = require("../controllers/userController");
const { signUpValidation, loginValidations } = require("../middleware/validators");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API working !!");
});

router.post("/signup", signUpValidation, createUser);
router.post("/login", loginValidations, loginUser);


module.exports = router;
