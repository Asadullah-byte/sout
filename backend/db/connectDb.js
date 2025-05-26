import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb connection established ✅");
  } catch (error) {
    console.error("❌Connection Error:", error);
    process.exit(1);
  }
};
