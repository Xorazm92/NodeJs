import { getUserService, createUserService, updateUserService, getUserbyIdService, deleteUserService } from '../services/index.js';

const getUser =async(req, res, next)=>{
    try {
        // const       
        const users = await getUserService();
        res.json(users);
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const createUser =async(req, res, next)=>{
    try {
        const user = await createUserService(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser =async(req, res, next)=>{
    try {
        const userId  = req.params.id;
        console.log('id : ',req.params);
        
        const userdata = req.body;
        const updated = await updateUserService(userId, userdata);
        if (updated) {
          const updatedUser = await getUserbyIdService(userId);
          res.status(200).send(updatedUser);
        } else {
          throw new Error('User not found');
        }
      } catch (error) {
        res.status(500).send(error);
      }    
}

const deleteUser =async(req, res, next)=>{
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
          where: { id: id }
        });
        if (deleted) {
          res.status(204).send("User deleted");
        } else {
          throw new Error("User not found");
        }
      } catch (error) {
        res.status(500).send(error);
      }
}

export default {getUser, createUser, updateUser, deleteUser};