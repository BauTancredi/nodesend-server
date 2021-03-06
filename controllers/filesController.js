const multer = require("multer");
const fs = require("fs");
const shortid = require("shortid");

const Links = require("../models/Link");

exports.uploadFile = async (req, res) => {
  const multerConfig = {
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads");
      },
      filename: (req, file, cb) => {
        const extension = file.originalname.substring(
          file.originalname.lastIndexOf("."),
          file.originalname.length
        );
        cb(null, `${shortid.generate()}${extension}`);
      },
    })),
  };

  const upload = multer(multerConfig).single("file");

  upload(req, res, async (error) => {
    if (!error) {
      res.json({ file: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

exports.deleteFile = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log("File deleted");
  } catch (error) {
    console.log(error);
  }
};

exports.download = async (req, res, next) => {
  const link = await Links.findOne({ name: req.params.file });

  const file = __dirname + "/../uploads/" + req.params.file;

  res.download(file);

  // If downloads are = 1. Delete file
  const { downloads, name } = link;
  if (downloads === 1) {
    // Delete the file
    req.file = name;
    // Delete entry from DB
    await Links.findOneAndRemove(link.id);

    next();
  } else {
    // If downloads are > 1. Substract 1
    link.downloads--;
    await link.save();
  }
};
