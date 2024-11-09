import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parentCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category", // 
      default: null,   // yuqoridagi  category bo'lmasa
    },
  },
  {
    timestamps: true, 
  }
);

export const Category = mongoose.model("category", categorySchema);
