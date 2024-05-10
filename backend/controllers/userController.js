const upload = require("../middleware/multer");
const { users } = require("../models/userModel");
const {
  registerNewUser,
  findUser,
  validateLogin,
} = require("../services/userServices");

// function to create new user
const createUser = async (req, res) => {
  // console.log("req.body", req.body.email);
  const isUser = await findUser(req.body.email);
  if (isUser.status) {
    res.send({ status: false, error: isUser.message });
  } else {
    await registerNewUser(req, res);
  }
};

// function to login existing user
const loginUser = async (req, res) => {
  const isUser = await findUser(req.body.email);
  if (isUser.status) {
    await validateLogin(req, res);
  } else {
    res.send({ status: false, message: "User not Registered!" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.headers.userId;

  try {
    const updateQuery = await users.findByIdAndUpdate(userId, req.body);

    res.send({ status: true, message: "Profile updated successfully!" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { createUser, loginUser, updateUser };
