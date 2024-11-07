import bcrypt from 'bcrypt';
import { User } from '../models/index.js';
import { generateToken } from '../helpers/jwt.js';

export const loginUserCon = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid email or password');
    }

    const token = generateToken(user);
    res.status(200).send({
      status: 'Success',
      token,
    });
  } catch (err) {
    next(err);
  }
};
