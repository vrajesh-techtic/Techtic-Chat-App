const mongoose = require("mongoose");
const moment = require("moment");
const { createHashPassword } = require("../helpers/passwords");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    countryCode: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    dob: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
    },

    lastSeen: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  this.password = await createHashPassword(this.password);
  next();
});

const users = mongoose.model("user", userSchema);

module.exports = { users };
