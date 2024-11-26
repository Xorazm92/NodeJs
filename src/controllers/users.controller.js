import { createUserService, deleteUserSersice, getUserSersice, updateUserSersice } from '../services/index.service.js'
import { AppError, logger } from '../utils/index.js'

export const createUserController = async (req, res, next) =>{
    try {
        const body = req.body
        const newUser = await createUserService(body)
        return res.status(201).send({
            message: 'created',
            data: newUser.id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllUserController = async (req, res, next) =>{
    try {
        const allUser = await getUserSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allUser
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdUserController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const user = await getUserSersice('id', id)

        if(user.length === 0){
            throw new AppError('user not found', 404)
        }

        return res.status(201).send({
            message: 'success',
            data: user
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const searchUserController = async (req, res, next) =>{
    try {
        const {search} = req.query
        
        const users = await getUserSersice('search', search)

        if(users.length === 0){
            throw new AppError('user not found', 404)
        }

        return res.status(201).send({
            message: 'success',
            data: users
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateUserController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const body = req.body
        const updateUser = await updateUserSersice(body, id)

        return res.status(201).send({
            message: 'success',
            data: updateUser[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteUserController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteUser = await deleteUserSersice(id)

        return res.status(201).send({
            message: 'success',
            data: deleteUser[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}