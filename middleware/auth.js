const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (authHeader) {
    // Obtain token
    const token = authHeader.split(" ")[1];

    // Check token

    try {
      const user = jwt.verify(token, process.env.SECRET);
      req.user = user;
    } catch (error) {
      console.log(error);
      console.log("JWT not valid");
    }
  }

  return next();
};
