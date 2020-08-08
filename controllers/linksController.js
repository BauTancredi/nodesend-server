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
  const { name_original, password, name } = req.body;
  const link = new Links();

  link.url = shortid.generate();
  link.name = name;
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

  res.json({ file: link.name, password: false });

  next();
};

exports.getAllLinks = async (req, res) => {
  try {
    const links = await Links.find({}).select("url -_id");
    res.json({ links });
  } catch (error) {
    console.log(error);
  }
};

// Verifies if link has password
exports.verifyPassword = async (req, res, next) => {
  // Verify if the link exists
  const link = await Links.findOne({ url: req.params.url });

  if (!link) {
    res.status(404).json({ msg: "The link is not valid" });
    return next();
  }

  if (link.password) {
    return res.json({ password: true, link: link.url });
  }

  next();
};

// Verifies if password is correct
exports.verifyUserPassword = async (req, res, next) => {
  const { url } = req.params;
  const { password } = req.body;

  const link = await Links.findOne({ url });
  console.log(link);

  if (bcrypt.compareSync(password, link.password)) {
    next();
  } else {
    res.status(401).json({ msg: "Incorrect Password" });
  }
};
