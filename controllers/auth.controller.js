
import { checkPassword, getUserByEmail, saveUser, getUserById, updateUserById, deleteUserById } from '../services/auth.service.js'

const validateUserData = (userData) => {
    const { username, password, fullName, age, gender } = userData;
    
    if (username.length <= 3) {
        throw new Error("Username must be longer than 3 characters");
    }

    if (password.length <= 5) {
        throw new Error("Password must be longer than 5 characters");
    }

    if (fullName.length <= 10) {
        throw new Error("Full name must be longer than 10 characters");
    }

    if (age <= 10) {
        throw new Error("Age must be greater than 10");
    }

    const validGenders = ['M', 'F'];
    if (!validGenders.includes(gender)) {
        throw new Error("Gender must be 'M' (Male) or 'F' (Female)");
    }
};

export const registerController = async (req, res, next) => {
  try {
    validateUserData(req.body);
    const user = await saveUser(req.body)
    res.send(user)
  } catch (error) {
    next(error)
  }
}

export const loginController = async (req, res, next) => {
  try {
    const loginData = req.body

    const user = await getUserByEmail(loginData.email)

    const passwordCompare = await checkPassword(loginData, user.password)

    console.log({
      user,
      passwordCompare,
      loginData
    });

    if (!passwordCompare) {
      throw new Error(`EMAIL OR PASSWORD is not correct`)
    }

    res.send("WELCOME TO HOME! BABY :)")
  } catch (error) {
    next(error)
  }
}

export const updateUserController = async (req, res, next) => {
    try {
        validateUserData(req.body);
        const id = req.params.id; 
        const updatedUser = await updateUserById(id, req.body);  // ID bo'yicha foydalanuvchini yangilash
        if (!updatedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(updatedUser);
    } catch (error) {
        next(error);  
    }
};


export const deleteUserController = async (req, res, next) => {
    try {
        const id = req.params.id;  
        const deletedUser = await deleteUserById(id);  
        if (!deletedUser) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send({ message: "User successfully deleted" });
    } catch (error) {
        next(error);  
    }
};

export const getUserController = async (req, res, next) => {
    try {
        const id = req.params.id;  
        const user = await getUserById(id);  
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        next(error);  
    }
};
