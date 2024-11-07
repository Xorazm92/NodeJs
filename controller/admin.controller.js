import { Admin } from "../models/index.js";
import adminCheck from "../schema/admin.schema.js";

export const createAdminCon = async (req, res, next) => {
  try {
    const { error, value } = adminCheck(req.body);
    if (error) {
      return res.status(400).send("Fields must be filled correctly");
    }
    const newAdmin = new Admin({ ...req.body });
    await newAdmin.save();

    res.status(201).send({
      status: "Created",
      admin: newAdmin._id,
    });
  } catch (err) {
    next(err);
  }
};

// Get all admins
export const getAdminCon = async (req, res, next) => {
  try {
    const admins = await Admin.find();
    res.status(200).send({
      status: "Success",
      admins,
    });
  } catch (err) {
    next(err);
  }
};

// Get admin by ID
export const getAdminByIdCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    res.status(200).send({
      status: "Success",
      data: admin,
    });
  } catch (err) {
    next(err);
  }
};

// Update admin
export const updateAdminCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error, value } = adminCheck(req.body);
    if (error || !id) {
      return res.status(400).send("Fields must be filled correctly");
    }
    const updatedAdmin = await Admin.findByIdAndUpdate(id, value, { new: true });
    res.status(200).send({
      status: "Updated",
      data: updatedAdmin,
    });
  } catch (err) {
    next(err);
  }
};

// Delete admin
export const deleteAdminCon = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return res.status(404).send("Admin not found");
    }
    res.status(200).send({
      status: "Deleted",
    });
  } catch (err) {
    next(err);
  }
};
