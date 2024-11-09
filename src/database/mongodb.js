import mongoose from "mongoose";
import { logger } from "../utils/index.js";
import dotenv from 'dotenv';
dotenv.config();


export const connectMongodb = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGODB_URI); 
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info("MONGODB CONNECTED!");
  } catch (error) {
    throw new Error(error);
  }
};





