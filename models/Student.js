const { model, Schema } = require('mongoose');

const StudentSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  password: String,
});

module.exports = model('Student', StudentSchema);
