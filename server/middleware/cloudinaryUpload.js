require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});
const uploadFile = async (path) => {
  const response = await cloudinary?.uploader?.upload(path);
  return response;
};

module.exports = { uploadFile };
