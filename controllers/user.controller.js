import User from '../models/user.js'; 


export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        next(error); 
    }
}


export async function getUserById(req, res, next) {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) 
            return res.status(404).json({ message: "not found" });
        res.json(user);
    } catch (error) {
        next(error); 
    }
}


export async function createUser(req, res) {
    try {
        const user = new User(req.body); 
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error }); 
}
}

export async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true }).select('password');
        if (!user) 
            return res.status(404).json({ message: "not found" });
        res.json(user);
    } catch (error) {
        next(error); 
    }
}


export async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.sendStatus(204);
    } catch (error) {
        next(error); 
    }
}
