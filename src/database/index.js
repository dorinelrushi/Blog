import mongoose from "mongoose";

const connnectToDB = async () => {
  const URL = process.env.MONGODB_DATABASE;

  try {
    await mongoose.connect(URL);
    console.log("Database is connnected");
  } catch (error) {
    console.log("Error connect your database", error);
  }
};

export default connnectToDB;
