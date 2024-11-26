import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getUserSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('users')
                break;
            case 'id':
                result = await db.select().from('users').where('id', '=', date)
                break
            case 'email':
                result = await db.select().from('users').where('email', '=', date)
                break
            case 'search':
                result = await db.select().from('users').whereILike(`name`, `%${date}%`)                
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createUserService = async(user) =>{
    try {
        const currentUserEmail = await getUserSersice('email', user.email)
        
        if(currentUserEmail.length !== 0){
            throw new AppError("email is alredy exsist", 400)
        }
        const newUser = await db('users').insert(user).returning("*")
        return newUser
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updateUserSersice = async(user, id) =>{
    try {
        const currentUser = await getUserSersice('id', id)
        if(currentUser.length === 0){
            throw new AppError("user not found", 404)
        }

        const currentUserEmail = await getUserSersice('email', user.email)
        
        if(currentUserEmail.length !== 0 && user.email !== currentUser[0].email){
            throw new AppError("email is alredy exsist", 400)
        }

        const updateUser = await db('users').where('id', '=', id).update(user)
        return updateUser
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteUserSersice = async(id) =>{
    try {
        const currentUser = await getUserSersice('id', id)
        if(currentUser.length === 0){
            throw new AppError("user not found", 404)
        }


        const deleteUser = await db('users').where('id', '=', id).del().returning('*')
        return deleteUser
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}