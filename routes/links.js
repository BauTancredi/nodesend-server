const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../middleware/auth");
const linksController = require("../controllers/linksController");
const filesController = require("../controllers/filesController");

router.post(
  "/",
  [
    check("name", "Upload a file").not().isEmpty(),
    check("name_original", "Upload a file").not().isEmpty(),
  ],
  auth,
  linksController.newLink
);

router.get("/", linksController.getAllLinks);
router.get("/:url", linksController.obtainLink, filesController.deleteFile);

module.exports = router;
