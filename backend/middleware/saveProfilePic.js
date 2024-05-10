const fs = require("fs");

const savePic = async (req, res) => {
  try {
    const file = req.file;
    const folderPath = "/backend/uploads/profile-images/";
    const fileName = `${Date.now()}_${file.originalname}`;

    const fileLocation = folderPath + fileName;

    console.log("fileLocation", fileLocation);

    const addFile = fs.writeFileSync(fileName, file.buffer, {
      encoding: file.encoding,
    });

    console.log("addFile", addFile);

    res.send(addFile);
  } catch (error) {
    res.send({ status: false, error: "Error while uploading Profile Pic!" });
  }
};

module.exports = savePic;
