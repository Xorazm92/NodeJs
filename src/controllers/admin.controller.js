import { errorHandler } from "../helpers/error_handler";
import { findOne, create, findOneAndUpdate, find, findByIdAndUpdate, findByIdAndDelete, findById } from "../schemas/Admin";
import { adminValidation } from "../validations/admin.validation";

import { hashSync, compareSync } from "bcrypt";

import jwt from "jsonwebtoken";

import { get } from "config";

import { generateTokens, verifyRefreshToken } from "../services/jwt_service";

import { v4 } from "uuid";

import { sendActivationMail } from "../services/mail_service";



export const addAdmin = async (req, res) => {
  try {
    const {error,value} = adminValidation(req.body)
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { 
      name,
      email,
      phone,
      password,
      is_active,
      is_creator,
      created_date,
      updated_date,
    } = value;
    const admin = await findOne({
      email: { $regex: email, $options: "i" },
    });
    if (admin){
      return res.status(400).send({message: "Bunday Admin email mavjud"})
    }
    const hashedPassword = hashSync(password, 7);
    
    const activation_link = v4();
    
    const newAdmin = await create({ 
      name, 
      email,
      phone,
      password: hashedPassword,
      is_active,
      is_creator,
      created_date,
      updated_date,
      activation_link,
    });

    await sendActivationMail(
      email,
      `${get("api_url")}:${get(
        "port"
      )}/api/admin/activate/${activation_link}`
    );


    const payload = {
      _id: newAdmin._id,
      email: newAdmin.email,
      is_creator: newAdmin.is_creator,
    };

    const tokens = generateTokens(payload);
    newAdmin.token = tokens.refreshToken;
    await newAdmin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: get("refresh_time_ms"),
    });

    res.status(201).send({
      message: "Yangi Admin qo'shildi",
      id: newAdmin._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await findOne({ email });
    if (!admin) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }
    const payload = {
      _id: admin._id,
      email: admin.email,
      is_creator: admin.is_creator,
      admin_roles: ["READ","WRITE","UPDATE","DELETE"]
    };

    const tokens = generateTokens(payload);
    admin.token = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: get("refresh_time_ms"),
    });

    res.send({
      message: "Logged in,Welcome",
      id: admin._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


export const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).send({ message: "Token noto'g'ri" });
    }
    const admin = await findOneAndUpdate(
      { token: refreshToken },
      { token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(400).send({ message: "Refresh token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Logged out", refreshToken: admin.token });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(403)
        .send({ message: "Cookieda Refresh token topilmadi" });
    }
    const [error, decodedRefreshToken] = await to(
      verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(403).send({ message: error.message });
    }
    const adminFromDB = await findOne({ token: refreshToken });
    if (!adminFromDB) {
      return res
        .status(403)
        .send({
          message: "Ruxsat etilmagan foydalanuvchi(refresh token mos emas)",
        });
    }
    const payload = {
      _id: adminFromDB._id,
      email: adminFromDB.email,
      is_expert: adminFromDB.is_expert,
    };

    const tokens = generateTokens(payload);
    adminFromDB.token = tokens.refreshToken;
    await adminFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: get("refresh_time_ms"),
    });

    res.send({
      message: "Refresh token updated successfully",
      id: adminFromDB._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


export const getAdmins = async (req, res) => {
  try {
    const admins = await find();
    res.send(admins);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const {id} = req.params
    const {
      name,
      email,
      phone,
      password,
      is_active,
      is_creator,
      created_date,
      updated_date,
    } = req.body;
    const admin = await find({
      email: { $regex: email, $options: "i" },
    });
    console.log(admin,typeof admin);
    
    if (admin.length > 1) {
      return res.status(400).send({ message: "Bunday Admin email mavjud" });
    }
    const updatedAdmin = await findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        password,
        is_active,
        is_creator,
        created_date,
        updated_date,
      },
      { new: true }
    );
    res.status(200).send({message:"Admin updated succesfuly",updatedAdmin})
  } catch (error) {
    errorHandler(res, error);
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params
    const deletedAdmin = await findByIdAndDelete(id)
    res.status(200).send({message:"Admin deleted succesfuly", deletedAdmin})
  } catch (error) {
    errorHandler(res, error);
  }
}




export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await findById(id);
    if (id !== req.admin._id) {
      return res.status(403).send({ message: "Access denied admin" });
    }
    res.send(admin);
  } catch (error) {
    errorHandler(res, error);
  }
}

export const adminActivate = async (req, res) => {
  try {
    const link = req.params.link;
    const admin = await findOne({ activation_link: link });
    if (!admin) {
      return res.status(404).send({ message: "Admin mavjud emas" });
    }
    if (admin.is_active) {
      return res.status(400).send({ message: "Admin already activated" });
    }
    admin.is_active = true;
    await admin.save();
    res.send({
      message: "Admin activated successfully",
      is_active: admin.is_active,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


