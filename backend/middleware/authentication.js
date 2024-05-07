const jwt = require("jsonwebtoken");
const { findUserById } = require("../services/userServices");

const authenticate = async (req, res, next) => {
  try {
    const cookies = req.headers.cookie.split(";");
    const tokenId = cookies[0].split("=")[1];
    const id = jwt.verify(tokenId, process.env.SECRET_KEY);

    const isUser = await findUserById(id);
    if (isUser.status) {
      req.headers.userId = isUser.data._id;
      next();
    } else {
      res.send(isUser);
    }
  } catch (error) {
    res.send({ status: false, message: "Invalid Token" });
  }
};

module.exports = { authenticate };
