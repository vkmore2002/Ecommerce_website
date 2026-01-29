import mongoose from "mongoose";

// const MONGO_URL = process.env.MONGO_URI;

//this code will establish your connection with the database
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    console.log("ENV CHECK:", process.env.MONGODB_URI);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default dbConnection;
