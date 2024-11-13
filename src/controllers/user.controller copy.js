const { errorHandler } = require("../helpers/error_handler");
const User = require("../schemas/User");
const { userValidation } = require("../validations/user.validation");

const bcrypt = require("bcrypt");

const config = require("config");

const myJwt = require("../services/jwt_service");

const uuid = require('uuid');

const mail_service = require("../services/mail_service");

const addUser = async (req, res) => {
  try {
    const {error,value} = userValidation(req.body)
    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const { 
      name,
      email,
      password,
      info,
      photo,
      created_date,
      updated_date,
      is_active 
    } = value;
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });
    if (user){
      return res.status(400).send({message: "Bunday User email mavjud"})
    }

    const hashedPassword = bcrypt.hashSync(password, 7);

    const activation_link = uuid.v4();

    const newUser = await User.create({ 
      name, 
      email,
      password: hashedPassword,
      info,
      photo,
      created_date,
      updated_date,
      is_active,
      activation_link
    });

    await mail_service.sendActivationMail(
      email,
      `${config.get("api_url")}:${config.get(
        "port"
      )}/api/user/activate/${activation_link}`
    );


    const payload = {
      _id: newUser._id,
      email: newUser.email,
    };

    const tokens = myJwt.generateTokens(payload);
    newUser.token = tokens.refreshToken;
    await newUser.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.status(201).send({
      message: "Yangi User qo'shildi",
      id: newUser._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: "Email yoki password noto'g'ri" });
    }
    const payload = {
      _id: user._id,
      email: user.email,
      user_roles: ["READ"]
    };

    const tokens = myJwt.generateTokens(payload);
    user.token = tokens.refreshToken;
    await user.save();

    
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.send({
      message: "Logged in,Welcome",
      id: user._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(403).send({ message: "Token noto'g'ri" });
    }
    const user = await User.findOneAndUpdate(
      { token: refreshToken },
      { token: "" },
      { new: true }
    );
    if (!user) {
      return res.status(400).send({ message: "Refresh token noto'g'ri" });
    }

    res.clearCookie("refreshToken");
    res.send({ message: "Logged out", refreshToken: user.token });
  } catch (error) {
    errorHandler(res, error);
  }
};


const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(403)
        .send({ message: "Cookieda Refresh token topilmadi" });
    }
    const [error, decodedRefreshToken] = await to(
      myJwt.verifyRefreshToken(refreshToken)
    );
    if (error) {
      return res.status(403).send({ message: error.message });
    }
    const userFromDB = await User.findOne({ token: refreshToken });
    if (!userFromDB) {
      return res
        .status(403)
        .send({
          message: "Ruxsat etilmagan foydalanuvchi(refresh token mos emas)",
        });
    }
    const payload = {
      _id: userFromDB._id,
      email: userFromDB.email
    };

    const tokens = myJwt.generateTokens(payload);
    userFromDB.token = tokens.refreshToken;
    await userFromDB.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("refresh_time_ms"),
    });

    res.send({
      message: "Refresh token updated successfully",
      id: userFromDB._id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};



const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(400).send({message: "Birorta user topilmadi"})
    res.send(users);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const {id} = req.params
    const {
      name,
      email,
      password,
      info,
      photo,
      created_date,
      updated_date,
      is_active,
    } = req.body;
    const user = await User.find({
      email: { $regex: email, $options: "i" },
    });
    console.log(user,typeof user);
    
    if (user.length > 1) {
      return res.status(400).send({ message: "Bunday User email mavjud" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        password,
        info,
        photo,
        created_date,
        updated_date,
        is_active,
      },
      { new: true }
    );
    res.status(200).send({message:"User updated succesfuly",updatedUser})
  } catch (error) {
    errorHandler(res, error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)
    res.status(200).send({message:"User deleted succesfuly", deletedUser})
  } catch (error) {
    errorHandler(res, error);
  }
}




const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (id !== req.user._id){
      return res.status(403).send({ message: "Access denied user" }); 
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User mavjud emas" });
    }
    res.send(user);
  } catch (error) {
    errorHandler(res, error);
  }
}


const userActivate = async (req, res) => {
  try {
    const link = req.params.link;
    const user = await User.findOne({ activation_link: link });
    if (!user) {
      return res.status(404).send({ message: "User mavjud emas" });
    }
    if (user.is_active) {
      return res.status(400).send({ message: "User already activated" });
    }
    user.is_active = true;
    await user.save();
    res.send({
      message: "User activated successfully",
      is_active: user.is_active,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  logoutUser,
  refreshToken,
  userActivate,
};
