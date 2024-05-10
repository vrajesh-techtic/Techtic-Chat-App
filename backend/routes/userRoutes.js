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
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.get("/", (req, res) => {
  res.send("API working !!");
});

router.get("/validate-token", async (req, res) => {
  res.send(authenticate(req));
});

router.post(
  "/signup",
  upload.single("profilePic"),
  signUpValidation,
  createUser
);
// router.post("/signup", upload.any(), (req, res) => {
//   console.log(req.files);
// });

router.post("/login", loginValidations, loginUser);
router.post("/update-user", authenticate, updateValidations, updateUser);

module.exports = router;
