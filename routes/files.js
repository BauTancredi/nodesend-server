const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const filesController = require("../controllers/filesController");

router.post("/", filesController.uploadFile);
router.delete("/:id", filesController.deleteFile);

module.exports = router;
