const Course = require('../../models/Course');
const Student = require('../../models/Student');

exports.fetchCourse = async (courseId, next) => {
  try {
    const course = await Course.findById(courseId);
    return course;
  } catch (error) {
    next(error);
  }
};

exports.coursesDelete = async (req, res, next) => {
  try {
    await Course.findByIdAndRemove(req.course.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.coursesUpdate = async (req, res, next) => {
  try {
    await Course.findByIdAndUpdate(req.course.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.coursesGet = async (req, res, next) => {
  try {
    const courses = await Course.find({}, '-createdAt -updatedAt')
      .populate('teacherId', 'name')
      .populate('students', 'name');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

exports.courseEnroll = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    await Course.findByIdAndUpdate(req.course.id, {
      $push: { students: studentId },
    });
    await Student.findByIdAndUpdate(studentId, {
      $push: { courses: req.course.id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
