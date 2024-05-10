const multer = require("multer");
const { signUpValidation } = require("./validators");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // return cb(null, `../backend/uploads/profile-images/`);
    // console.log("req.body", req.body);
    signUpValidation(req.body);
    return file;
  },

  //   filename: function (req, file, cb) {
  //     return cb(null, `${Date.now()}_${file.originalname}`);
  //   },
});

const upload = multer({ storage });

module.exports = upload;
