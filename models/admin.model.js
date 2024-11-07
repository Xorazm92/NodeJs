import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const adminSchema = new mongoose.Schema({

});

adminSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: 'admin' }, 
    process.env.JWT_SECRET,
    { expiresIn: '1h' } 
  );
  return token;
};

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
