const express = require("express");
const router = express.Router();

// User Model
const User = require("./../../models/User");

// Middleware
const { auth } = require("./../../middleware/auth");

// auth
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});

// register
router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false });
    res.status(200).json({
      success: true,
      userData: doc,
    });
  });
});

// login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth Failed, Email Not Found",
      });
    }

    user.comparePassword(req.body.password, (err, isMatched) => {
      if (!isMatched) {
        return res.json({ loginSuccess: false, message: "Wrong Password" });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        if (typeof localStorage === "undefined" || localStorage === null) {
          var LocalStorage = require('node-localstorage').LocalStorage;
          localStorage = new LocalStorage('./scratch');
        }
        localStorage.setItem("token", user.token)
        res
          .cookie("w_auth", user.token)
          .status(200)
          .json({
            loginSuccess: true,
          });
      });
    });
  });
});

// logout
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      token: "",
    },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    },
  );
});

// update info
router.post("/update-info", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: req.body,
    },
    { new: true },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({ success: true });
    },
  );
});

module.exports = router;
