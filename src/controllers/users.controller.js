import {
    createUserService,
    daleteUserService,
    getUserService,
    updateUserService,
} from '../services/index.js'
import { logger } from '../utils/index.js'


export const createUserController = async (c) => {
    try {
        const body = c.req.body

        const newData = await createUserService(body)
        return c.json({
            message: 'created',
            data: newData[0].id,
        }, 201)
    } catch (error) {
        logger.error(error.message)

        next(error)
    }
}

export const getAllUserController = async (c) => {
    try {
        const allData = await getUserService('all')
        return c.json({
            message: 'success',
            data: allData,
        },200)
    } catch (error) {
        logger.error(error.message)

        next(error)
    }
}

export const getByIdUserController = async (c) => {
    try {
        const id = c.req.params.id
        const data = await getUserService('id', id)
        return c.json({
            message: 'success',
            data: data,
        },200)
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const getBySearchUserController = async (c) => {
    try {
        const { username } = c.req.query
        console.log({ username })

        const data = await getUserService('username', username)
        return c.json({
            message: 'success',
            data: data,
        }, 200)
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const updateUserController = async (c) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = await updateUserService(id, body)
        return c.json({
            message: 'updated',
            data: data[0].id,
        }, 200)
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const deleteUserController = async (c) => {
    try {
        const id = c.req.params.id
        const data = await daleteUserService(id)
        return c.json({
            message: 'deleted',
            data: data[0].id,
        }, 200)
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}
