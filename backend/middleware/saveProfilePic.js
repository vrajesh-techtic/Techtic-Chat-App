const fs = require("fs");

const savePic = (req, res) => {
  try {
    const file = req.file;
    const folderPath = "/backend/uploads/profile-images/";
    const fileName = `${Date.now()}_${file.originalname}`;

    const fileLocation = folderPath + fileName;

    console.log("fileLocation", fileLocation);

    const addFile = fs.writeFile(
      fileLocation,
      file.buffer.data,
      { encoding: file.encoding },
      (err) => {
        res.send(err); 
      }
    );

    // console.log("addFile", addFile);

    res.send(file);
  } catch (error) {
    res.send({ status: false, error: "Error while uploading Profile Pic!" });
  }
};

module.exports = savePic;
