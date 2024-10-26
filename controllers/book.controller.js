const bookService = require('../services/book.service');

class BookController {
    async createBook(req, res) {
        try {
            const { title, author } = req.body;

            if (!title || !author) {
                return res.status(400).json({
                    message: 'Kitob nomi va muallif talab qilinadi'
                });
            }

            const book = await bookService.createBook(req.body, req.user.id);
            res.status(201).json({
                message: 'Kitob muvaffaqiyatli qo\'shildi',
                book
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }

    async getAllBooks(req, res) {
        try {
            const books = await bookService.getAllBooks(req.query);
            res.json({
                message: 'Kitoblar ro\'yxati',
                books
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }

    async getBookById(req, res) {
        try {
            const book = await bookService.getBookById(req.params.id);

            if (!book) {
                return res.status(404).json({
                    message: 'Kitob topilmadi'
                });
            }

            res.json({
                message: 'Kitob ma\'lumotlari',
                book
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }

    async updateBook(req, res) {
        try {
            const { title, author } = req.body;

            if (!title || !author) {
                return res.status(400).json({
                    message: 'Kitob nomi va muallif talab qilinadi'
                });
            }

            const isOwner = await bookService.checkBookOwnership(req.params.id, req.user.id);
            if (!isOwner) {
                return res.status(403).json({
                    message: 'Sizda bu kitobni tahrirlash huquqi yo\'q'
                });
            }

            const book = await bookService.updateBook(req.params.id, req.body, req.user.id);
            if (!book) {
                return res.status(404).json({
                    message: 'Kitob topilmadi'
                });
            }

            res.json({
                message: 'Kitob muvaffaqiyatli yangilandi',
                book
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }

    async deleteBook(req, res) {
        try {
            const isOwner = await bookService.checkBookOwnership(req.params.id, req.user.id);
            if (!isOwner) {
                return res.status(403).json({
                    message: 'Sizda bu kitobni o\'chirish huquqi yo\'q'
                });
            }

            const book = await bookService.deleteBook(req.params.id, req.user.id);
            if (!book) {
                return res.status(404).json({
                    message: 'Kitob topilmadi'
                });
            }

            res.json({
                message: 'Kitob muvaffaqiyatli o\'chirildi'
            });

        } catch (err) {
            res.status(500).json({
                message: 'Server xatosi',
                error: err.message
            });
        }
    }
}

module.exports = new BookController();