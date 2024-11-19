const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://codedUser:coded123@cluster0.9v4dl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
