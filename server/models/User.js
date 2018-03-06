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

userSchema.pre("save", function(next) {
  var user = this;

  bcrypt.genSalt(8, function(err, salt) {
    if (err) return next(err);
    
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next(); 
    })
  })
})

userSchema.methods.comparePassword = function(password) {
  bcrypt.compare(password, this.password, function(err, res) {
    return res; 
  })
}

module.exports = mongoose.model("User", userSchema);
