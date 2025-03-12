import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongodb. conn: ${conn?.connection?.host}`);
  } catch (error) {
    console.log("failed to connect to mongodb ", error);
    process.exit(1); // 1 is success and 0 is failure
  }
};
