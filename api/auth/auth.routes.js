const express = require("express");
const router = express.Router();
const { signup } = require("./auth.controllers");

router.post("/signup", signup);

// router.get('/', studentsGet);
// router.post('/', studentsCreate);

// router.delete('/:studentId', studentsDelete);

// router.put('/:studentId', studentsUpdate);

module.exports = router;
