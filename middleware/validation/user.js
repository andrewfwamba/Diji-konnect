const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  // Check names
  check("fullname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Must be a valid name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must between 3 and 20 characters long"),
  // check email
  check("email")
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid email address"),
  // Check phone
  check("phone")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Phone is required")
    .isInt()
    .withMessage("Invalid phone number")
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone must be between 10 and 20 characters"),
  // check password values
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must between 8 and 20 characters long"),
  // Verify password match with confirm password
  check("confirmpassword")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Provide a confirm password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password should match confirm password");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.json({ success: false, message: error });
};

exports.validateUserSignIn = [
  check("email").trim().isEmail().withMessage("email/password is required"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email/password is required"),
];
