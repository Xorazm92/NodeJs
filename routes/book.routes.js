const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/', authenticateToken, bookController.createBook.bind(bookController));
router.get('/', bookController.getAllBooks.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));
router.put('/:id', authenticateToken, bookController.updateBook.bind(bookController));
router.delete('/:id', authenticateToken, bookController.deleteBook.bind(bookController));

module.exports = router;