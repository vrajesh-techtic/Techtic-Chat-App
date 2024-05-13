const fs = require("fs");
const path = require("path");

const savePic = async (file) => {
  try {
    if (!file) {
      return {
        status: true,
        url: `${process.env.BACKEND_URL}/uploads/defaultProfilePic.png`,
      };
    }
    const uploadPath = path.join(__dirname, "..", "uploads", "profile-images");

    const fileName = `${Date.now()}_${file.originalname}`;

    const fileLocation = path.join(uploadPath, fileName);

    fs.writeFileSync(fileLocation, file.buffer);

    return {
      status: true,
      url: `${process.env.BACKEND_URL}/uploads/profile-images/${fileName}`,
    };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

module.exports = savePic;
