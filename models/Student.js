const { model, Schema } = require("mongoose");

const StudentSchema = new Schema({
  name: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

module.exports = model("Student", StudentSchema);
