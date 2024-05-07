const countryCode = require("../models/ISDModel");

const addCountryCodes = async (req, res) => {
  try {
    const addCodes = await countryCode.insertMany(req.body.data);

    if (addCodes) {
      res.send({ status: true, message: "Country codes added to DB" });
    }
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

const getCountryCodes = async (req, res) => {
  try {
    const getCodes = await countryCode.find({}, { _id: 0, country: 0 });

    res.send({ status: true, data: getCodes });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
};

module.exports = { addCountryCodes, getCountryCodes };
