const express = require("express");
const { imageCompressorCtr } = require("../controllers/imageCompressorCtr");
const imageUploadMW = require("../middleware/imageUploadMW");

const router = express.Router();

router.post("/image", imageUploadMW.single("image"), imageCompressorCtr);

module.exports = router;
