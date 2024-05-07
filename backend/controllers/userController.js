const {
  registerNewUser,
  findUser,
  validateLogin,
} = require("../services/signup");

const createUser = async (req, res) => {
  const isUser = await findUser(req.body.email);
  if (isUser.status) {
    res.send(isUser);
  } else {
    await registerNewUser(req, res);
  }
};

const loginUser = async (req, res) => {
  const isUser = await findUser(req.body.email);
  if (isUser.status) {
    await validateLogin(req, res);
  } else {
    res.send({ status: false, message: "User not Registered!" });
  }
};

module.exports = { createUser, loginUser };
