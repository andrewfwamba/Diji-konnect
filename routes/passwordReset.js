const User = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utilities/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/api/resetpassword", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.send({
        success: false,
        message: "User with given email does not exist",
      });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }
    const link = `${process.env.BASEURL}/passwordreset/${user._id}/${token.token}}`;
    await sendEmail(user.email, "passwordreset", link);

    res.send({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.send({ success: false, message: "An error occured" });
    console.log(error);
  }
});

router.post("/api/:userId/:token", async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    // Update password
    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

module.exports = router;
