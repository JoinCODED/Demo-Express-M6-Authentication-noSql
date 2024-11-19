const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Student = require("../../models/Student");
const User = require("../../models/User");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);

  try {
    const profile = await Student.create({ name });
    const user = await User.create({
      email,
      password: hashedPassword,
      profile: profile._id,
    });
    profile.user = user._id;
    profile.save();

    const payload = {
      id: user.id,
      profile: user.profile,
      email: user.email,
      exp: Date.now() + +process.env.JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  const { user } = req;
  const payload = {
    id: user.id,
    profile: user.profile,
    email: user.email,
    exp: Date.now() + +process.env.JWT_EXPIRATION_MS,
  };
  const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET);
  res.status(200).json({ token });
};
