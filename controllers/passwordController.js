const { createAccessToken } = require("../helpers/tokens");
const { findUser } = require("../services/userServices");
const { updatePassword } = require("./userController");

const forgotPassword = async (req, res) => {
  try {
    const isUser = await findUser(req.body.email);
    const userId = isUser?.data?._id.valueOf();
    if (isUser?.status) {
      const newToken = createAccessToken(userId);
      res
        .status(200)
        .send({ status: true, message: "Valid User!", token: newToken });
    } else {
      res
        .status(401)
        .send({ status: false, message: "Email address not registered!" });
    }
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const validateForgotPWD = async (req, res) => {
  try {
    await updatePassword(req, res);
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports = { forgotPassword, validateForgotPWD };
