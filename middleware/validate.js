const { body, param, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};

const registerValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phone").isMobilePhone().withMessage("Invalid phone number"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

const uploadValidation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("fileName").notEmpty().withMessage("File name is required"),
];

const getDocsValidation = [
  param("email").isEmail().withMessage("Invalid email"),
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  uploadValidation,
  getDocsValidation,
};