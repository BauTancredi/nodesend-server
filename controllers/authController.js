const bcrypt = require("bcrypt");

const User = require("../models/User");

exports.authenticateUser = async (req, res, next) => {
  // Verify errors

  // Search for the user
  const { email, password } = req.body;
  const user = User.findOne({ email });

  if (!user) {
    res.status(401).json({ msg: "The user not exists" });
    return next();
  }

  // Verify password and authenticate user

  if (bcrypt.compareSync(password, user.password)) {
    // Create JWT
  } else {
    res.status(401).json({ msg: "Incorrect password" });
    return next();
  }
};

exports.userAuthenticated = async (req, res) => {};
