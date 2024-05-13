const { users } = require("../models/userModel");
const {
  registerNewUser,
  findUser,
  validateLogin,
  updateProfile,
} = require("../services/userServices");

// function to create new user
const createUser = async (req, res) => {
  const isUser = await findUser(req.body.email);
  if (isUser.status) {
    res.status(404).send({ status: false, error: isUser.message });
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
    res.status(401).send({ status: false, message: "User not Registered!" });
  }
};

const updateUser = async (req, res) => {
  await updateProfile(req, res);
};

module.exports = { createUser, loginUser, updateUser };
