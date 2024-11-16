const express = require('express');
const { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } = require('../controllers/category.controller');

export const categoryRouter = express.Router();

categoryRouter.post('/create', addCategory)
categoryRouter.get("/get", getCategories);
categoryRouter.put("/update/:id", updateCategory);
categoryRouter.delete("/delete/:id", deleteCategory);
categoryRouter.get('/:id', getCategoryById);


module.exports = router;