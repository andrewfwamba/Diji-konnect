const express = require("express");
const router = express.Router();
const {
  createUser,
  userSignIn,
  getUsers,
  uploadProfile,
  signOut,
} = require("../controllers/user");
const { isAuth } = require("../middleware/auth");
const {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} = require("../middleware/validation/user");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image type!", false);
  }
};

const uploads = multer({ storage, fileFilter });

router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.get("/sign-out", isAuth, signOut);
router.get("/get-users", getUsers);
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);
router.get("/profile", isAuth, (req, res) => {
  if (!req.user)
    return res.json({ success: false, message: "Unauthorized access" });
  res.json({
    success: true,
    profile: {
      fullname: req.user.fullname,
      email: req.user.email,
      avatar: req.user.avatar ? req.user.avatar : "",
    },
  });
});

module.exports = router;
