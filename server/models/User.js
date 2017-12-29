const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    required: true,
    default: "member"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  }
});

module.exports = mongoose.model("User", userSchema);
