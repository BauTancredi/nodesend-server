const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../controllers/authController");

router.post("/", authController.authenticateUser);

router.get("/", authController.userAuthenticated);

module.exports = router;
