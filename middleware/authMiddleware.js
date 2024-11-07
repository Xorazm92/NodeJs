import { verifyToken } from '../helpers/jwt.js';

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN" formatini ishlatish
  if (!token) {
    return res.status(401).send('No token, authorization denied');
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Token ma'lumotlarini req obyektiga qo'shish
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};
