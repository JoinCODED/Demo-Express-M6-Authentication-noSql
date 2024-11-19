const express = require("express");
const passport = require("passport");
require("dotenv/config");

const connectDb = require("./database");
const authRoutes = require("./api/auth/auth.routes");
const teachersRoutes = require("./api/teachers/teachers.routes");
const studentsRoutes = require("./api/students/students.routes");
const coursesRoutes = require("./api/courses/courses.routes");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();

connectDb();
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use("/auth", authRoutes);
app.use("/teachers", teachersRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
