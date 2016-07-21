var
  passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  User = require('../models/User.js').User

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
