// import mongoose from "mongoose";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

module.exports = mongoose.model("token", tokenSchema);
