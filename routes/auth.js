// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to initiate Google OAuth login
router.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route for Google OAuth callback
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req, res) => {
    // Successful authentication, redirect to job homepage
    res.redirect('/');
  }
);


// Route to logout the user and destroy session
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      console.error(err);
      return next(err);
    }
    res.redirect('/'); // Redirect to homepage after logout
  });
});

module.exports = router;
