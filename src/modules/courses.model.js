import { Schema, model } from "mongoose";

const CourseSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        unique: true,
      },
    CategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",  
        default: null,   
      },
    descripton: {
        type: text,
        required: true,
    }

    },
)

module.exports = model("Course", CourseSchema);