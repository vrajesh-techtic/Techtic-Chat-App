const { verifyPassword } = require("../helpers/passwords");
const { generateToken } = require("../helpers/tokens");
const { users } = require("../models/userModel");
const { ObjectId } = require("mongodb");

const findUserById = async (id) => {
  try {
    const findUser = await users.findById(new ObjectId(id), {
      email: 0,
      password: 0,
    });
    if (findUser !== null) {
      return { status: true, data: findUser };
    } else {
      return { status: false, message: "User does not exists!" };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const findUser = async (email) => {
  try {
    const findUser = await users.findOne({ email });
    if (findUser !== null) {
      return { status: true, message: "User already exists!" };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const registerNewUser = async (req, res) => {
  try {
    const createQuery = await users.create(req.body);

    if (createQuery) {
      const token = generateToken(createQuery._id.valueOf());
      res.cookie("TokenId", token);

      res.send({ status: true, message: "User added successfully!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginQuery = await users.findOne({ email });

    if (await verifyPassword(password, loginQuery.password)) {
      const token = generateToken(loginQuery._id.valueOf());
      res.cookie("TokenId", token);
      res.send({ status: true, message: "Login Successfully" });
    } else {
      res.send({ status: false, message: "Invalid Password!" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { registerNewUser, findUser, validateLogin, findUserById };
