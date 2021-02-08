const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const uuid = require("uuid");
const Image = require("../models/Image");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  }
});

const upload = multer({ storage }).single("image");

router.post("/upload", upload, (req, res) => {
  let myFile = req.file.originalname.split(".");
  const fileType = myFile[myFile.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: req.file.buffer
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      res.status(500).send(error);
    }
    await Image.create({ fileLink: data.Location, s3_key: data.key });
    res.status(200).send(data);
  });
});

router.get("/images", async (req, res) => {
  try {
    const images = await Image.find({});
    res.send(images);
  } catch (error) {
    console.log("/images", error);
    res.status(400).send({ get_error: "Error while getting images." });
  }
});

router.get("/images/:id", async (req, res) => {
  try {
    const result = await Image.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting image" });
  }
});

module.exports = router;
