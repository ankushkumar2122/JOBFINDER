
// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Load User model if you're using a database
// const User = require('../models/user');  // Assuming you have a User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,         // Use environment variables for security
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    // Use the Google profile information (like profile.id) to find or create a user in your database
    // Example: Find the user by Google ID or create a new user entry
    try {
      // const existingUser = await User.findOne({ googleId: profile.id });
      // if (existingUser) return done(null, existingUser);
      
      // If the user doesn't exist, create a new one
      // const newUser = new User({ googleId: profile.id, displayName: profile.displayName });
      // await newUser.save();
      // return done(null, newUser);
      
      return done(null, profile); // For now, just return the profile
    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize the user to save in the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
