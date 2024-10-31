import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User =  mongoose.model("User", userSchema)

