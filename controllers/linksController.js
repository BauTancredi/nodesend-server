const bcrypt = require("bcrypt");
const shortid = require("shortid");
const { validationResult } = require("express-validator");

const Links = require("../models/Link");

exports.newLink = async (req, res, next) => {
  //Show error messages from express validator
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Creating Link object
  const { name_original, password } = req.body;
  const link = new Links();

  link.url = shortid.generate();
  link.name = shortid.generate();
  link.name_original = name_original;
  link.password = password;

  // If user authenticated
  if (req.user) {
    const { password, downloads } = req.body;

    // Add downloads and password
    if (downloads) link.downloads = downloads;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      link.password = await bcrypt.hash(password, salt);
    }

    // Add the auhtor
    link.author = req.user.id;
  }

  // Save on DB
  try {
    await link.save();
    return res.json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};

// Obtain link
exports.obtainLink = async (req, res, next) => {
  // Verify if the link exists
  const link = await Links.findOne({ url: req.params.url });

  if (!link) {
    res.status(404).json({ msg: "The link is not valid" });
    return next();
  }

  res.json({ file: link.name });

  // If downloads are = 1. Delete file
  const { downloads, name } = link;
  if (downloads === 1) {
    // Delete the file
    req.file = name;
    // Delete entry from DB
    await Links.findOneAndRemove(req.params.url);

    next();
  } else {
    // If downloads are > 1. Substract 1
    link.downloads--;
    await link.save();
  }
};
