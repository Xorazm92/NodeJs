const pool = require('../config/database');

class BookService {
    async createBook(bookData, userId) {
        const { title, author, publication_date, genre } = bookData;
        
        const result = await pool.query(
            `INSERT INTO books (title, author, publication_date, genre, user_id) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING *`,
            [title, author, publication_date, genre, userId]
        );

        return result.rows[0];
    }

    async getAllBooks(filters = {}) {
        const { genre, author, search } = filters;
        let query = 'SELECT * FROM books WHERE 1=1';
        const params = [];

        if (genre) {
            params.push(genre);
            query += ` AND genre = $${params.length}`;
        }
        if (author) {
            params.push(author);
            query += ` AND author = $${params.length}`;
        }
        if (search) {
            params.push(`%${search}%`);
            query += ` AND (title ILIKE $${params.length} OR author ILIKE $${params.length})`;
        }

        const result = await pool.query(query, params);
        return result.rows;
    }

    async getBookById(id) {
        const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
        return result.rows[0];
    }

    async updateBook(id, bookData, userId) {
        const { title, author, publication_date, genre } = bookData;

        const result = await pool.query(
            `UPDATE books 
             SET title = $1, author = $2, publication_date = $3, genre = $4 
             WHERE id = $5 AND user_id = $6 
             RETURNING *`,
            [title, author, publication_date, genre, id, userId]
        );

        return result.rows[0];
    }

    async deleteBook(id, userId) {
        const result = await pool.query(
            'DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, userId]
        );
        return result.rows[0];
    }

    async checkBookOwnership(bookId, userId) {
        const result = await pool.query(
            'SELECT user_id FROM books WHERE id = $1',
            [bookId]
        );
        return result.rows[0]?.user_id === userId;
    }
}

module.exports = new BookService();