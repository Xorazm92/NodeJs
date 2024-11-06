import { Category } from "../models/index.js";
import categoryChek from "../schema/category.schema.js";

export const createCategoryCon = async (req, res, next) => {
  try {
    const { error, valus } = categoryChek(req.body);
    if (error) {
      return res.status(400).send("fiellds must be filled");
    }
    const newCategory = await Category({
      ...req.body,
    });
    await newCategory.save();

    res.status(201).send({
      status: "Creted",
      user: newCategory._id,
    });
  } catch (err) {
    next(err);
  }
};

export const getCategoryCon = async (req, res, next) => {
  try {
    const categoryget = await Category.find();

    res.status(201).send({
      status: "Get",
      categorys: categoryget,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategoryCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = categoryChek(req.body);
    if (error || !id) {
      return res.status(400).send("fiellds must be filled");
    }
    const updatedAuthor = await Category.findByIdAndUpdate(id, value);
    res.status(201).send({
      status: "Updated",
      data: updatedAuthor,
    });
  } catch (err) {
    next(err);
  }
};

export const getByIdCategoryCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const categoryData = await Category.find({ _id: id });
    res.status(201).send({
      status: "get",
      data: categoryData,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCategoryCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const deleteCategory = await Category.deleteOne({ _id: id });
    if (deleteCategory.deletedCount) {
      return res.status(201).send({
        status: "deleted",
      });
    }
  return res.status(404).send({
    status: "Not found",
  });
  } catch (err) {
    next(err);
  }
};
