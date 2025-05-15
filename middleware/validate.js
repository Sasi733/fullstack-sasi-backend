const { body, param, validationResult } = require("express-validator");

const validate = (validations = []) => {
  return async (req, res, next) => {
    if (!Array.isArray(validations)) {
      console.error("❌ validate() expected array, got:", validations);
      return next(new Error("Validation rules must be an array"));
    }

    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
};

const uploadValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fileName").notEmpty().withMessage("File name is required"),
];

const getDocsValidation = [
  param("email").isEmail().withMessage("Invalid email"),
];

module.exports = {
  validate,
  uploadValidation,
  getDocsValidation
};
