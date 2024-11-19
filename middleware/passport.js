const bcrypt = require("bcrypt");

const User = require("../models/User");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

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

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) return done(null, false);

    try {
      const user = await User.findById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
