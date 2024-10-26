const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/jwt.util');

class UserService {
    async register(userData) {
        const { username, email, password } = userData;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        const token = generateToken(result.rows[0]);
        return { user: result.rows[0], token };
    }

    async login(email, password) {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
        if (user.rows.length === 0) {
            throw new Error('Foydalanuvchi topilmadi');
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            throw new Error('Noto\'g\'ri parol');
        }

        const token = generateToken(user.rows[0]);
        return { token };
    }
}

module.exports = new UserService();
