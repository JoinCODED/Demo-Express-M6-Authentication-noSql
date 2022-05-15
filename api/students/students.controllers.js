const Student = require('../../models/Student');
const jwt = require('jsonwebtoken');
const { JWT_EXPIRATION_MS, JWT_SECRET } = require('../../config/keys');

exports.fetchStudent = async (studentId) => {
  try {
    const student = await Student.findById(studentId);
    return student;
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const { password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newStudent = await Student.create(req.body);
    const payload = {
      id: newStudent.id,
      name: newStudent.name,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    name: user.name,
    exp: Date.now() + JWT_EXPIRATION_MS,
  };

  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};

exports.studentsDelete = async (req, res, next) => {
  try {
    await Student.findByIdAndRemove(req.student.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.studentsUpdate = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(req.student.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.studentsGet = async (req, res, next) => {
  try {
    const students = await Student.find({}, '-createdAt -updatedAt').populate(
      'courses',
      'name'
    );
    res.json(students);
  } catch (error) {
    next(error);
  }
};
