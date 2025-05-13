// backend/routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const { uploadDocument, getUserDocuments } = require("../controllers/documentController");

router.post("/upload", auth, upload.single("document"), uploadDocument);
router.get("/user/:email", auth, getUserDocuments);

module.exports = router;
