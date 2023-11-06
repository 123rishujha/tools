const sharp = require("sharp");
const path = require("path");
// const os = require("os");
const fs = require("fs");
const { uploadStream } = require("../middleware/cloudinaryUpload");

const imageCompressorCtr = async (req, res) => {
  const file = req.file;
  const originalImagePath = file.path;
  const { quality, fileFormat } = req.body;

  try {
    if (!quality) {
      return res.status(400).json({ msg: "quality is required" });
    }

    if (!fileFormat) {
      if (originalImagePath) {
        fs.unlinkSync(originalImagePath);
      }
      return res.status(400).json({ msg: "file format is required" });
    }

    try {
      const sharpImage = sharp(originalImagePath);

      if (fileFormat === "jpeg" || fileFormat === "jpg") {
        sharpImage.jpeg({ quality: Number(quality) });
      } else if (fileFormat === "png") {
        sharpImage.png({ quality: Number(quality) });
      } else if (fileFormat === "webp") {
        sharpImage.webp({ quality: Number(quality) });
      }
      // await sharpImage.toFile(compressedImagePath);
      const compressedBuffer = await sharpImage.toBuffer();

      const uploadImage = await uploadStream(compressedBuffer);

      if (originalImagePath) {
        fs.unlinkSync(originalImagePath);
      }

      console.log("uploadImage", uploadImage);

      res.status(200).json({
        msg: "success",
        url: uploadImage.url,
        secure_url: uploadImage.secure_url,
        filename: file?.filename?.split("-")[1] || "compressed",
      });
    } catch (err) {
      console.log(err, "first error");
      if (originalImagePath) {
        fs.unlinkSync(originalImagePath);
      }
      res.status(400).json({ msg: err });
    }
  } catch (err) {
    console.log(err, "second error");
    //just removing the images from folder
    if (originalImagePath) {
      fs.unlinkSync(originalImagePath);
    }
    res.status(400).json({ msg: err });
  }
};

module.exports = { imageCompressorCtr };
