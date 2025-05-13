// backend/controllers/documentController.js
const User = require("../models/User");

const uploadDocument = async (req, res) => {
  if (!req.file || !req.file.filename) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const { email, fileName, fileType = "pdf" } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const document = {
      fileName,
      fileUrl,
      fileType,
      uploadedAt: new Date(),
    };

    user.documents.push(document);
    await user.save();

    res.status(200).json({
      message: "File uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserDocuments = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const sortedDocs = user.documents.sort((a, b) => b.uploadedAt - a.uploadedAt);
    res.status(200).json({ documents: sortedDocs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadDocument, getUserDocuments };
