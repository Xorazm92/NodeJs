import express from 'express';
import { createBlog, readBlogs, editBlog, removeBlog, searchBlogPosts } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/', createBlog);
router.get('/', readBlogs);
router.put('/:id', editBlog);
router.delete('/:id', removeBlog);
router.get('/search', searchBlogPosts);

export default router;
