const express = require("express");
const router = express.Router();
const { signup, signin } = require("./auth.controllers");
const passport = require("passport");

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

// router.get('/', studentsGet);
// router.post('/', studentsCreate);

// router.delete('/:studentId', studentsDelete);

// router.put('/:studentId', studentsUpdate);

module.exports = router;
