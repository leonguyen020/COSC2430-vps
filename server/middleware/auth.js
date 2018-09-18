const User = require("./../models/User");

let auth = (req, res, next) => {
  // let token = req.cookies.w_auth;
  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  let token = localStorage.getItem("token")
  // console.log("eeeeeeeeeeeeeee", token)
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
