import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../blogs.json");

export const getBlogs = async () => {
    try {
        const data = await fs.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        return [];
    }
};

export const addBlog = async (blog) => {
    try {
        const blogs = await getBlogs();
        blogs.push(blog);
        await fs.writeFile(dataPath, JSON.stringify(blogs, null, 2));
    } catch (error) {
        console.error("Error writing data:", error);
    }
};

export const updateBlog = async (id, updatedBlog) => {
    try {
        const blogs = await getBlogs();
        const index = blogs.findIndex(blog => blog.id === id);
        if (index !== -1) {
            blogs[index] = { ...blogs[index], ...updatedBlog };
            await fs.writeFile(dataPath, JSON.stringify(blogs, null, 2));
        }
    } catch (error) {
        console.error("Error updating data:", error);
    }
};

export const deleteBlog = async (id) => {
    try {
        const blogs = await getBlogs();
        const filteredBlogs = blogs.filter(blog => blog.id !== id);
        await fs.writeFile(dataPath, JSON.stringify(filteredBlogs, null, 2));
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

export const searchBlogs = async (searchTerm) => {
    try {
        const blogs = await getBlogs();
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } catch (error) {
        console.error("Error searching data:", error);
        return [];
    }
};