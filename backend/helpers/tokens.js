const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign(id, process.env.SECRET_KEY);
  return token;
};

const decryptToken = (encrypted) => {
  const id = jwt.verify(encrypted, process.env.SECRET_KEY);
  return id;
};

module.exports = { generateToken, decryptToken };
