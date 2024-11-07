import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { role: 'user' }, 
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

const User = mongoose.model('User', userSchema);
export default User;
