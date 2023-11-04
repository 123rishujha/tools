const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, path.join(__dirname, "../imageUploads"));
  },
  filename: async (req, file, cb) => {
    const filename = Date.now() + Math.random() + "-" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
