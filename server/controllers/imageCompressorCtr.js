const sharp = require("sharp");
const path = require("path");
// const os = require("os");
const fs = require("fs");
const { uploadFile } = require("../middleware/cloudinaryUpload");

const imageCompressorCtr = async (req, res) => {
  try {
    const file = req.file;

    const originalImagePath = file.path;

    const compressedDirectory = "../imageCompressed";

    // Ensure the upload directory exists, or create it if it doesn't
    if (!fs.existsSync(compressedDirectory)) {
      fs.mkdirSync(compressedDirectory, { recursive: true });
    }

    const compressedImagePath = path.join(
      __dirname,
      // "../imageCompressed",
      compressedDirectory,
      `${file.filename}-compressed.jpg`,
    );

    try {
      await sharp(originalImagePath)
        .jpeg({ quality: 10 })
        .toFile(compressedImagePath);
      const uploadImage = await uploadFile(compressedImagePath);

      res.status(200).json({
        msg: "success",
        url: uploadImage.url,
        secure_url: uploadImage.secure_url,
        filename: file?.filename?.split("-")[1] || "compressed",
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ msg: err });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};

module.exports = { imageCompressorCtr };
