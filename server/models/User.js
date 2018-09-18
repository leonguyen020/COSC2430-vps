const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const SALT_I = 10;
const jwt = require("jsonwebtoken");
const SECRET = "SECRET";
require("dotenv").config();

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1,
  },

  password: {
    type: String,
    trim: true,
    minlength: 5,
    required: true,
  },

  firstName: {
    type: String,
    required: true,
    maxlength: 100,
  },

  lastName: {
    type: String,
    required: true,
    maxlength: 100,
  },

  cart: {
    type: Array,
    default: [],
  },

  history: {
    type: Array,
    default: [],
  },

  role: {
    type: Number,
    default: 0,
  },

  token: {
    type: String,
  },

  active: {
    type: Boolean,
    default: true,
  },
});

// Hash password
UserSchema.pre("save", function(next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// Compare password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatched) {
    if (err) return cb(err);
    cb(null, isMatched);
  });
};

// Generate token
UserSchema.methods.generateToken = function(cb) {
  var user = this;
  // var token = jwt.sign(user._id.toHexString(),process.env.SECRET);
  var token = jwt.sign(user._id.toHexString(), SECRET);
  user.token = token;
  user.save(function(err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// Find by token
UserSchema.statics.findByToken = function(token, cb) {
  var user = this;
  // jwt.verify(token,process.env.SECRET,function(){})
  jwt.verify(token, SECRET, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      // null means no error
      cb(null, user);
    });
  });
};

module.exports = mongoose.model("users", UserSchema);
