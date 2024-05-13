const moment = require("moment");
const joi = require("joi");

const signUpValidation = (req, res, next) => {
  console.log("called");
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "string.email": "Please enter valid email!",
    }),
    username: joi.string().alphanum().min(4).max(20).required().messages({
      "string.pattern.base": "Username must be alphanumeric only! ",
      "string.min": "Username should be of minimum 4 characters",
      "string.max": "Username should be of maximum 20 characters only",
    }),
    password: joi
      .string()
      .required("Enter your password")
      .min(8)
      .max(32)
      .custom((value, helpers) => {
        if (!/[a-z]/.test(value)) {
          return helpers.error("lowercase");
        }
        if (!/[A-Z]/.test(value)) {
          return helpers.error("uppercase");
        }
        if (!/[0-9]/.test(value)) {
          return helpers.error("number");
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
          return helpers.error("special");
        }
        return value;
      }, "password validation")
      .messages({
        "string.min": "Password must have minimum 8 characters",
        "string.max": "Password must have maximum 32 characters",
        lowercase: "Password must have atleast one lowercase character",
        uppercase: "Password must have atleast one uppercase character",
        number: "Password must have atleast one digit",
        special: "Password must have atleast one special character",
      }),

    // confirmPassword: Joi.ref("password"),
    confirmPassword: joi
      .string()
      .required()
      .custom((value, helpers) => {
        if (value !== req.body.password) {
          return helpers.error("notSame");
        }
      }, "confirm password")
      .messages({ notSame: "Both passwords must be same!" }),
    name: joi
      .string()
      .pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/)
      .required()
      .messages({
        "string.pattern.base": "Name must be alphabets only! ",
      }),
    countryCode: joi.string().required(),
    phoneNumber: joi.string().min(10).max(10).required().messages({
      "string.min": "Please enter 10 digit phone number",
      "string.max": "Please enter 10 digit phone number",
    }),
    gender: joi.string().required(),
    dob: joi
      .date()
      .iso()
      .max(moment.utc().format("YYYY-MM-DD"))
      .required()
      .messages({
        "date.format": "Date of Birth must be in (YYYY-MM-DD) format",
      }),
    // profilePic: joi.optional(),
    // lastSeen: joi.optional(),
  });

  // console.log("req.file", req.file);

  const errors = schema.validate(req.body);
  if (errors.error) {
    res.status(404).send({ status: false, error: errors.error.message });
  } else {
    next();
  }
};

const loginValidations = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required().messages({
      "string.email": "Please enter valid email!",
    }),
    // username: joi.string().alphanum().min(4).max(20).required().messages({
    //   "string.pattern.base": "Username must be alphanumeric only! ",
    //   "string.min": "Username should be of minimum 4 characters",
    //   "string.max": "Username should be of maximum 20 characters only",
    // }),
    password: joi
      .string()
      .required("Enter your password")
      .min(8)
      .max(32)
      .custom((value, helpers) => {
        if (!/[a-z]/.test(value)) {
          return helpers.error("lowercase");
        }
        if (!/[A-Z]/.test(value)) {
          return helpers.error("uppercase");
        }
        if (!/[0-9]/.test(value)) {
          return helpers.error("number");
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
          return helpers.error("special");
        }
        return value;
      }, "password validation")
      .messages({
        "string.min": "Password must have minimum 8 characters",
        "string.max": "Password must have maximum 32 characters",
        lowercase: "Password must have atleast one lowercase character",
        uppercase: "Password must have atleast one uppercase character",
        number: "Password must have atleast one digit",
        special: "Password must have atleast one special character",
      }),
  });
  const errors = schema.validate(req.body);
  if (errors.error) {
    res.status(404).send({ status: false, error: errors.error.message });
  } else {
    next();
  }
};

const updateValidations = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().alphanum().min(4).max(20).messages({
      "string.pattern.base": "Username must be alphanumeric only! ",
      "string.min": "Username should be of minimum 4 characters",
      "string.max": "Username should be of maximum 20 characters only",
    }),

    name: joi
      .string()
      .pattern(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/)
      .messages({
        "string.pattern.base": "Name must be alphabets only! ",
      }),
    countryCode: joi.string(),
    phoneNumber: joi.string().min(10).max(10).messages({
      "string.min": "Please enter 10 digit phone number",
      "string.max": "Please enter 10 digit phone number",
    }),
    gender: joi.string(),
    dob: joi.date().iso().max(moment.utc().format("YYYY-MM-DD")).messages({
      "date.format": "Date of Birth must be in (YYYY-MM-DD) format",
    }),
    // profilePic: joi.string(),
  });

  const errors = schema.validate(req.body);
  if (errors.error) {
    res.status(404).send({ status: false, error: errors.error.details });
  } else {
    next();
  }
};

module.exports = { signUpValidation, loginValidations, updateValidations };
