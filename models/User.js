const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: Schema.Types.ObjectId, ref: "Student" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

module.exports = model("User", UserSchema);
