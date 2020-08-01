const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config({ path: ".env" });

const User = require("../models/User");

exports.authenticateUser = async (req, res, next) => {
  //Show error messages from express validator
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  // Search for the user
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ msg: "The user not exists" });
    return next();
  }

  // Verify password and authenticate user

  if (bcrypt.compareSync(password, user.password)) {
    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } else {
    res.status(401).json({ msg: "Incorrect password" });
    return next();
  }
};

exports.userAuthenticated = async (req, res) => {};
