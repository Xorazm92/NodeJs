import { Router } from 'express';
import { getUser, createUser, updateUser, deleteUser } from '../controllers/userConntroller.controller.js'; 

const route = Router();

// API to Get a User
route.get('/users', getUser);
  
// API to Create a New User
route.post('/users', createUser);

// API to Update a User
route.put('/users/:id', updateUser);

// API to Delete a User
route.delete('/users/:id', deleteUser);

export default route;