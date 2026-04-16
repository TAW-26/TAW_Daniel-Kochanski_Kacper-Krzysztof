import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://user_test:psswd_user@taw2.zvw2mj0.mongodb.net/backend?appName=TAW2"
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};