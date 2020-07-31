const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const userController = require("../controllers/userController");

router.post(
  "/",
  [
    check("name", "The name is mandatory").not().isEmpty(),
    check("email", "The email is not valid").isEmail(),
    check("password", "The password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  userController.newUser
);

module.exports = router;
