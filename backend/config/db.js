const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.log('>> Please check and update your MONGO_URI in backend/.env with your MongoDB Atlas connection string.');
  }
};

module.exports = connectDB;
