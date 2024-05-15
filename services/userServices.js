const { verifyPassword, createHashPassword } = require("../helpers/passwords");
const { generateTokens } = require("../helpers/tokens");
const savePic = require("../middleware/saveProfilePic");
const { findById } = require("../models/ISDModel");
const { passwords } = require("../models/passwordsModel");
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
      return { status: true, message: "User already exists!", data: findUser };
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
      req.body.profilePic = pic.fileName;

      let createQuery = await users.create(req.body);

      if (createQuery) {
        const { access_token, refresh_token } = generateTokens(
          createQuery._id.valueOf()
        );

        res.cookie("access_token", access_token);
        res.cookie("refresh_token", refresh_token);

        createQuery = createQuery.toObject();
        delete createQuery?.password;
        delete createQuery?._id;
        delete createQuery?.updatedAt;
        delete createQuery?.createdAt;

        let resp = createQuery;
        resp.profilePic = pic.url;

        res.status(200).send({
          status: true,
          message: "User added successfully!",
          data: resp,
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
      const { access_token, refresh_token } = generateTokens(
        loginQuery._id.valueOf()
      );

      res.cookie("access_token", access_token);
      res.cookie("refresh_token", refresh_token);

      loginQuery = loginQuery.toObject();
      delete loginQuery?.password;
      delete loginQuery?._id;

      const resp = loginQuery;
      resp.profilePic = `${process.env.BACKEND_URL}/uploads/profile-images/${loginQuery?.profilePic}`;
      res.status(200).send({
        status: true,
        message: "Login Successfully",
        data: resp,
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
  let picURL = "";

  try {
    if (req.file) {
      const pic = await savePic(req.file);

      if (pic.status) {
        req.body.profilePic = pic.fileName;
        picURL = pic.url;
      } else {
        return res.status(500).send(pic);
      }
    } else if (req.body.profilePic === "") {
      delete req.body?.profilePic;
    }

    let updateQuery = await users.findByIdAndUpdate(userId, req.body);

    const resp = (await findUserById(userId)).data.toObject();
    delete resp?._id;
    delete resp?.createdAt;
    delete resp?.updatedAt;

    resp.profilePic = picURL;

    if (updateQuery) {
      return res.status(200).send({
        status: true,
        message: "Profile updated successfully!",
        data: resp,
      });
    }
  } catch (error) {
    console.log("called");
    res.status(500).send({ status: false, message: error.message });
  }
};

const pwdChange = async (res, id, pwd, userData) => {
  const validatePWD = await verifyPassword(pwd, userData?.password);

  if (validatePWD) {
    return res.status(400).send({
      status: false,
      error: "New password must be different from Old password!",
    });
  } else {
    const password = await createHashPassword(pwd);

    const updatePWDQuery = await users.findByIdAndUpdate(id, { password });

    if (updatePWDQuery !== null) {
      const removeToken = await passwords.deleteOne({ userId: id });
      res
        .status(200)
        .send({ status: true, message: "Password Changed Successfully!" });
    }
  }
};

const changePassword = async (res, id, pwd, currPWD, type) => {
  try {
    const userData = await users.findById(id);
    let isReset = false;

    if (type === "reset") {
      isReset = true;
    }

    if (!isReset) {
      await pwdChange(res, id, pwd, userData);
    } else {
      const verifyCurr = await verifyPassword(currPWD, userData?.password);
      if (verifyCurr) {
        await pwdChange(res, id, pwd, userData);
      } else {
        res
          .status(401)
          .send({ status: false, error: "Incorrect current password" });
      }
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  registerNewUser,
  findUser,
  validateLogin,
  findUserById,
  updateProfile,
  changePassword,
};
