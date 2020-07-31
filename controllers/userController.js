const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/User");

exports.newUser = async (req, res) => {
  //Show error messages from express validator
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Verify if user is already registered
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({ msg: "The user is already registered" });

  // Create new user
  user = new User(req.body);

  // Password hash
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  try {
    await user.save();
    res.json({ msg: "User created" });
  } catch (error) {
    console.log(error);
  }
};
