import { User } from "../models/index.js";
import userCheck from "../schema/user.schema.js";

export const createUserCon = async (req, res, next) => {
  try {
    const { error, value } = userCheck(req.body);
    if (error) {
      return res.status(400).send("Fields must be filled correctly");
    }
    const newUser = new User({ ...req.body });
    await newUser.save();

    res.status(201).send({
      status: "Created",
      user: newUser._id,
    });
  } catch (err) {
    next(err);
  }
};

// Get all users
export const getUserCon = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({
      status: "Success",
      users,
    });
  } catch (err) {
    next(err);
  }
};

// Get user by ID
export const getUserByIdCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).send({
      status: "Success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUserCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = userCheck(req.body);
    if (error || !id) {
      return res.status(400).send("Fields must be filled correctly");
    }
    const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });
    res.status(200).send({
      status: "Updated",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUserCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.status(200).send({
      status: "Deleted",
    });
  } catch (err) {
    next(err);
  }
};
