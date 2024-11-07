import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role }, // Ma'lumotlarni tokenga qo'shish
    process.env.JWT_SECRET,            // JWT maxfiy kaliti
    { expiresIn: '1h' }                // Tokenning amal qilish muddati
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Token is invalid');
  }
};
