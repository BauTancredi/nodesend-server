const express = require("express");
const multer = require("multer");
const router = express.Router();

const auth = require("../middleware/auth");
const filesController = require("../controllers/filesController");

// Upload Files
const upload = multer({ dest: "./uploads/" });

router.post("/", upload.single("file"), filesController.uploadFile);
router.delete("/:id", filesController.deleteFile);

module.exports = router;
