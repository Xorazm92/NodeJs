import { addBlog, getBlogs, updateBlog, deleteBlog, searchBlogs } from '../services/blogs.service.js';

export const createBlog = async (req, res) => {
    const { blogTitle, blogDes } = req.body;
    const newBlog = {
        id: generateID(),
        title: blogTitle,
        description: blogDes,
    };
    await addBlog(newBlog);
    res.json(newBlog);
};

export const readBlogs = async (req, res) => {
    const blogs = await getBlogs();
    res.json(blogs);
};

export const editBlog = async (req, res) => {
    const blogId = parseInt(req.params.id);
    const updatedBlog = {
        title: req.body.blogTitle,
        description: req.body.blogDes,
    };
    await updateBlog(blogId, updatedBlog);
    res.json({ message: 'Blog updated successfully' });
};

export const removeBlog = async (req, res) => {
    const blogId = parseInt(req.params.id);
    await deleteBlog(blogId);
    res.json({ message: 'Blog deleted successfully' });
};

export const searchBlogPosts = async (req, res) => {
    const searchTerm = req.query.term;
    const results = await searchBlogs(searchTerm);
    res.json(results);
};

function generateID() {
    return Math.floor(Math.random() * 10000);
}