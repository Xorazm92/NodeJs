import { addProductToDb, getAllProducts, getOneProduct, updateProduct, deleteProduct } from '../service/phone.js';

export const createProductController = async (req, res, next) => {
  try {
    const newProduct = await addProductToDb(req.body);
    return res.status(201).json({ status: "Created", data: newProduct });
  } catch (error) {
    next(error);
  }
};

export const getAllProductsController = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getByIdProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getOneProduct(id);
    return res.status(200).json(product);
  } catch (error) {
    if (error.message === "Mahsulot topilmadi") {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

export const updateByIdProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedProduct = await updateProduct(id, data);
    res.status(200).json({ status: "Updated", data: updatedProduct });
  } catch (error) {
    if (error.message === "Mahsulot topilmadi") {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

export const deleteByIdProductController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ status: "Deleted" });
  } catch (error) {
    if (error.message === "Mahsulot topilmadi") {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};