const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { uploadDocument, getUserDocuments } = require("../controllers/documentController");
const auth = require("../middleware/auth"); // Assuming you use auth middleware

router.post("/upload", auth, upload.single("document"), uploadDocument);
router.get("/user/:email", auth, getUserDocuments);

module.exports = router;
