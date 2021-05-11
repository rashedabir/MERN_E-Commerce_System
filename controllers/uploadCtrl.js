const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadCtrl = {
  uploadFile: (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "No Files are Uploaded" });
      }
      const file = req.files.file;
      if (file.size > 1024 * 1024) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ msg: "File size is to Large" });
      }
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        return res.status(400).json({ msg: "File Format is Incorrect" });
      }
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        { folder: "we-shop" },
        async (err, result) => {
          if (err) throw err;
          removeTmp(file.tempFilePath);
          res.json({ public_id: result.public_id, url: result.secure_url });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteFile: (req, res) => {
    try {
      const { public_id } = req.body;
      if (!public_id) {
        return res.status(400).json({ msg: "No image is selected" });
      }
      cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
        if (err) throw err;
        res.json({ msg: "Deleted a Image" });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = uploadCtrl;
