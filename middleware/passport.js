const Student = require('../models/Student');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('../config/keys');

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;

exports.localStrategy = new LocalStrategy(
  { usernameField: 'name' },
  async (name, password, done) => {
    try {
      const student = await Student.findOne({
        name, // equivalent to { name : name }
      });

      const passwordsMatch = student
        ? await bcrypt.compare(password, student.password)
        : false;

      if (passwordsMatch) {
        return done(null, student);
      }
      return done(null, false);
    } catch (error) {
      done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },

  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const student = await Student.findById(jwtPayload.id);
      done(null, student); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
