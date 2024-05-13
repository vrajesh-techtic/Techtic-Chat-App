const { verifyPassword } = require("../helpers/passwords");
const { generateToken } = require("../helpers/tokens");
const savePic = require("../middleware/saveProfilePic");
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
    const pic = await savePic(req.file);
    if (pic.status) {
      req.body.profilePic = pic.url;
      let createQuery = await users.create(req.body);

      if (createQuery) {
        const token = generateToken(createQuery._id.valueOf());
        res.cookie("TokenId", token);

        createQuery = createQuery.toObject();
        delete createQuery?.password;
        delete createQuery?._id;
        delete createQuery?.updatedAt;
        delete createQuery?.createdAt;

        res.status(200).send({
          status: true,
          message: "User added successfully!",
          data: createQuery,
        });
      } else {
        res.status(500).send(pic);
      }
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const validateLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let loginQuery = await users.findOne(
      { email },
      { createdAt: 0, updatedAt: 0 }
    );

    if (await verifyPassword(password, loginQuery.password)) {
      const token = generateToken(loginQuery._id.valueOf());
      res.cookie("TokenId", token);
      loginQuery = loginQuery.toObject();
      delete loginQuery?.password;
      delete loginQuery?._id;
      res.status(200).send({
        status: true,
        message: "Login Successfully",
        data: loginQuery,
      });
    } else {
      res.status(401).send({ status: false, message: "Invalid Password!" });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.headers.userId;
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  console.log("req.headers.userId", req.headers.userId);

  try {
    const pic = await savePic(req.file);
    if (pic.status) {
      req.body.profilePic = pic.url;

      let updateQuery = await users.findByIdAndUpdate(userId, req.body);

      if (updateQuery) {
        res.status(200).send({
          status: true,
          message: "Profile updated successfully!",
          data: req.body,
        });
      } else {
        res.status(500).send(pic);
      }
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  registerNewUser,
  findUser,
  validateLogin,
  findUserById,
  updateProfile,
};
