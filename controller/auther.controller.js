import { Auther } from "../models/index.js";
import autherChek from "../schema/auther.schema.js";

export const getSearchAutherCon = async (req, res, next) => {
  try {
    const { q } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    if (!q) {
      return res.status(400).send("fiellds must be filled");
    }
    const autherCret = await Auther.find({ name: q }).limit(limit).skip(offset);

    res.status(201).send({
      status: "Creted",
      user: autherCret,
    });
  } catch (err) {
    next(err);
  }
};


export const createAutheryCon = async (req, res, next) => {
  try {
    const { error, value } = autherChek(req.body);
    if (error) {
      return res.status(400).send("fiellds must be filled");
    }
    const autherCret = await Auther({
      ...req.body,
    });
    await autherCret.save();

    res.status(201).send({
      status: "Creted",
      user: autherCret._id,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAutherCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = autherChek(req.body);
    if (error || !id) {
      return res.status(400).send("fiellds must be filled");
    }
    res.status(201).send({
      status: "Updated",
    });
  } catch (err) {
    next(err);
  }
};

export const getAutherCon = async (req, res, next) => {
  try {
    const autherget = await Auther.find();
    res.status(201).send({
      status: "Get",
      auther: autherget,
    });
  } catch (err) {
    next(err);
  }
};

export const getByIdAutherCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).send("fiellds must be filled");
    }
    const byId = await Auther.find({ _id: id });
    res.status(201).send({
      status: "get",
      data: byId,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteAutherCon = async (req, res, next) => {
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
