const bcrypt = require("bcrypt");

const User = require("../models/User");

const LocalStrategy = require("passport-local").Strategy;

exports.localStrategy = new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      const passwordsMatch = user
        ? await bcrypt.compare(password, user.password)
        : false;

      if (passwordsMatch) return done(null, user);

      return done(null, false);
    } catch (error) {
      return done(error);
    }
  }
);
