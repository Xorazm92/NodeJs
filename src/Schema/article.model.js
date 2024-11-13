import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    author_id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim:true,
    },
    artic: {
      type: String,
      required: true,
  },
  created_date: {
      type: Date,
      default: Date.now,
  },
  updated_date: {
      type: Date,
      default: Date.now,
  },
  category: {
    type: String,
  }

  },
  {
    timestamps: true, 
  }
);

export const Article = mongoose.model("Article", articleSchema);
