const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

router.post(
  "/",
  [
    check("email", "The email is not valid").isEmail(),
    check("password", "The password cant be empty").not().isEmpty({
      min: 6,
    }),
  ],
  authController.authenticateUser
);

router.get("/", auth, authController.userAuthenticated);

module.exports = router;
