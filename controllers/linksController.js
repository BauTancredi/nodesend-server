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
