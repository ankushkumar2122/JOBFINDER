const User=require("../models/user");

module.exports.rendersignup=(req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signup=async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password); // Register the user
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to JobFinder.com");
        res.redirect("/job");
      })
  
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };
  module.exports.renderlogin=(req, res) => {
    res.render("users/login.ejs");
  };

  module.exports.login=async (req, res) => {
    req.flash("success", "Welcome to Job Finder.com! You are logged in.");
    let redirectUrl = res.locals.redirectUrl || "/job";
    res.redirect(redirectUrl);
  };

  module.exports.logout=(req, res, next) => {
    req.logOut((err) => {
      if (err) {
        return next(err);
      }
      req.flash("succes", "you are logout now");
      res.redirect("/job");
    });
  };