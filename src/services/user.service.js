import { findAll, create, update, findOne } from '../models/index.js';

const getUserService = async()=>{
    try {
        return await findAll();
    } catch (error) {
        throw error
    }
}

const createUserService = async(data)=>{
    try {
        console.log('data : ', data);
        return await create(data);
    } catch (error) {
        throw error
    }
}

const updateUserService = async(userId, userdata)=>{
    try {
        console.log('userId : ', userId);
        console.log('userdata : ', userdata);
        return await update(userdata, { where: { id: userId }});
    } catch (error) {
        throw error
    }
}

const getUserbyIdService = async(userId)=>{
    try {
        return await findOne({ where: { id: userId } });
    } catch (error) {
        throw error
    }
}

const deleteUserService = async()=>{
    try {
        // return await User.findAll();
    } catch (error) {
        throw error
    }
}

export default {getUserService, createUserService, updateUserService, getUserbyIdService, deleteUserService};