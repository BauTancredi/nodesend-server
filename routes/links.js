const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const linksController = require("../controllers/linksController");

router.post("/", auth, linksController.newLink);

module.exports = router;
