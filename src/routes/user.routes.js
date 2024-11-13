const express = require('express');
const { addUser, getUsers, updateUser, deleteUser, getUserById, loginUser, logoutUser, refreshToken, userActivate } = require('../controllers/user.controller');
const router = express.Router();
const userPolice = require("../middleware/user_police");


router.post('/create', addUser)
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshToken);
router.get("/get", userPolice,getUsers);
router.get("/activate/:link", userActivate);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.get('/:id', getUserById);


module.exports = router;

