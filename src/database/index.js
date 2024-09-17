import mongoose from "mongoose";

const connnectToDB = async () => {
  const URL =
    "mongodb+srv://rushidorinel:rushidorinel@cluster0.cgjgkjb.mongodb.net/?retryWrites=true&w=majority";

  try {
    await mongoose.connect(URL);
    console.log("Database is connnected");
  } catch (error) {
    console.log("Error connect your database", error);
  }
};

export default connnectToDB;
