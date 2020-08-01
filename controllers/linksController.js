const Links = require("../models/Link");
const shortid = require("shortid");
const e = require("express");

exports.newLink = async (req, res, next) => {
  // Save on DB
  const { name_original, password } = req.body;
  const link = new Links();

  link.url = shortid.generate();
  link.name = shortid.generate();
  link.name_original = name_original;
  link.password = password;

  console.log(link);
  try {
    await link.save();
    return res.json({ msg: `${link.url}` });
    next();
  } catch (error) {
    console.log(error);
  }
};
