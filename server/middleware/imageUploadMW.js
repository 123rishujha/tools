const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDirectory = "../imageUploads"; // Specify the upload directory

// Ensure the upload directory exists, or create it if it doesn't
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    // cb(null, path.join(__dirname, "../imageUploads"));
    cb(null, path.join(__dirname, uploadDirectory));
  },
  filename: async (req, file, cb) => {
    const filename = Date.now() + Math.random() + "-" + file.originalname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
