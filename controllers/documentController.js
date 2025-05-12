const User = require("../models/User");

const uploadDocument = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const userEmail = req.body.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const fileUrl = req.file.path; // ✅ Cloudinary public URL
    user.documents.push(fileUrl);
    await user.save();

    res.status(200).json({
      message: "File uploaded and saved to user",
      fileUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUserDocuments = async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const sortedDocs = [...user.documents].reverse();
    res.status(200).json({ documents: sortedDocs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { uploadDocument, getUserDocuments };
