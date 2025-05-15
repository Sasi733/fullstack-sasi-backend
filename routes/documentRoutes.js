const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadDocument, getUserDocuments } = require("../controllers/documentController");
const { validate, uploadValidation, getDocsValidation } = require("../middleware/validate");

router.post(
  "/upload",
  upload.single("document"),
  validate(uploadValidation),
  uploadDocument
);

router.get(
  "/user/:email",
  validate(getDocsValidation),
  getUserDocuments
);

module.exports = router;
