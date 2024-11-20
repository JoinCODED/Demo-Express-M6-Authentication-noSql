const connectDb = require('./database');

const express = require('express');
const app = express();
const teachersRoutes = require('./api/teachers/teachers.routes');
const studentsRoutes = require('./api/students/students.routes');
const coursesRoutes = require('./api/courses/courses.routes');

connectDb();
app.use(express.json());
app.use('/teachers', teachersRoutes);
app.use('/students', studentsRoutes);
app.use('/courses', coursesRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

app.listen(8000, () => {
  console.log('The application is running on localhost:8000');
});
