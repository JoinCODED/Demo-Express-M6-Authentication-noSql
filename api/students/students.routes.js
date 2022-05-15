const express = require('express');
const router = express.Router();
const {
  studentsGet,
  studentsUpdate,
  studentsDelete,
  signup,
  fetchStudent,
  signin,
} = require('./students.controllers');
const passport = require('passport');

router.param('studentId', async (req, res, next, studentId) => {
  const student = await fetchStudent(studentId, next);
  if (student) {
    req.student = student;
    next();
  } else {
    const err = new Error('Student Not Found');
    err.status = 404;
    next(err);
  }
});

router.get('/', studentsGet);
router.post('/signup', signup);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signin
);

router.delete('/:studentId', studentsDelete);

router.put('/:studentId', studentsUpdate);

module.exports = router;
