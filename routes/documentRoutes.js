const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadDocument, getUserDocuments } = require("../controllers/documentController");

// Set up multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/upload", upload.single("document"), uploadDocument); // ✅ upload middleware here
router.get("/user/:email", getUserDocuments);

module.exports = router;
