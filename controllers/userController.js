const User = require("../models/User");

exports.newUser = async (req, res) => {
  console.log(req.body);

  // Verify if user is already registered
  const { email } = req.body;

  let user = await User.findOne({ email });

  if (user)
    return res.status(400).json({ msg: "The user is already registered" });

  user = await new User(req.body);
  user.save();

  res.json({ msg: "User created" });
};
