const userService = require('../services/user.service');

class UserController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    message: 'Username, email va parol talab qilinadi'
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    message: 'Yaroqsiz email format'
                });
            }

            const result = await userService.register(req.body);
            res.status(201).json({
                message: 'Foydalanuvchi muvaffaqiyatli yaratildi',
                ...result
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Email va parol talab qilinadi'
                });
            }

            const result = await userService.login(email, password);
            res.json({
                message: 'Muvaffaqiyatli login',
                ...result
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }
}

module.exports = new UserController();