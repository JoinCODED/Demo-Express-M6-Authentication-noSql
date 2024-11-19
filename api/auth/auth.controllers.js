const bcrypt = require("bcrypt");

const Student = require("../../models/Student");
const User = require("../../models/User");

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const profile = await Student.create({ name });
    const user = await User.create({
      email,
      password: hashedPassword,
      profile: profile._id,
    });
    profile.user = user._id;
    profile.save();
    res.status(201).json({ message: "Student account created" });
  } catch (error) {
    next(error);
  }
};
