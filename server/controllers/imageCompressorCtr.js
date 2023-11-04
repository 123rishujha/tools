const sharp = require("sharp"); // Import Sharp library
const path = require("path");
const os = require("os");

const imageCompressorCtr = async (req, res) => {
  try {
    const file = req.file;
    console.log("file original", file);
    // Define the path for the original and compressed images
    const originalImagePath = file.path;
    const compressedImageName = `${file.originalname.replace(
      ".jpg",
      "",
    )}-compressed.jpg`;
    const compressedImagePath = path.join(
      __dirname,
      "../imageCompressed",
      `${file.filename}-compressed.jpg`,
    );
    // const downloadFolder = path.join(
    //   os.homedir(),
    //   "Downloads",
    //   compressedImageName,
    // );

    const data = await sharp(originalImagePath)
      .jpeg({ quality: 50 })
      // .toFile(downloadFolder);
      .toFile(compressedImagePath);
    console.log("data compressed", data);

    // res.download(downloadFolder, compressedImageName);
    res.status(200).json({ msg: "success", ...data });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};

module.exports = { imageCompressorCtr };
