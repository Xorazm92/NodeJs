import mongoose from "mongoose";
import { config } from "dotenv";

config()


const { connect, model, Schema } = mongoose


const db_uri = process.env.MONGO_URI;

connect(db_uri);

const autherSchema = new Schema(
  {
    name: String,  
  },
  {
    timestamps: true,
  }
);

export const Auther = model("auther", autherSchema);