const express = require("express");
const router = express.Router();
const User = require("../models/user");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usercontroller=require("../controllers/user.js");


// Render signup form
router.get("/signup", usercontroller.rendersignup);

// Handle signup
router.post("/signup", WrapAsync(usercontroller.signup));

// Render login form
router.get("/login", usercontroller.renderlogin);

// Handle login
router.post("/login", saveRedirectUrl, passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), usercontroller.login);


router.get("/logout", usercontroller.logout);
module.exports = router;
