const express = require("express");
const { addCountryCodes, getCountryCodes } = require("../services/countryCode");
const router = express.Router();

router.post("/addCountryCodes", addCountryCodes);
router.get("/get-country-codes", getCountryCodes);

module.exports = router;
