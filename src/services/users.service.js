import { AppError } from '../utils/AppError.js'
import { logger } from '../utils/index.js'
import db from '../db/index.js'

export const getUserService = async (type, data) => {
    try {
        let result
        switch (type) {
            case 'all':
                result = await db.select().from('users')
                break
            case 'id':
                result = await db.select().from('users').where('id', '=', data)
                break
            case 'email':
                result = await db
                    .select()
                    .from('users')
                    .where('email', '=', data)
                break
            case 'username':
                result = await db
                    .select()
                    .from('users')
                    .where('username', '=', data)
                break
            default:
                throw new AppError('Invalid type', 400)
        }
        return result
    } catch (error) {
        logger.error(error.message)
        throw new AppError(error.message, 500)
    }
}

export const createUserService = async (c) => {
    try {
        const user = await c.req.json()
        const currentEmail = await getUserService('email', user.email)
        if (currentEmail.length !== 0) {
            throw new AppError('Email already exists', 403)
        }

        const currentUsername = await getUserService('username', user.username)
        if (currentUsername.length !== 0) {
            throw new AppError('Username already exists', 403)
        }
        const newUser = await db('users').insert(user).returning('*')
        return c.json({ message: 'created', data: newUser }, 201)
    } catch (error) {
        logger.error(error.message)
        return c.json({ error: error.message }, error.statusCode || 500)
    }
}

export const updateUserService = async (c) => {
    try {
        const id = c.req.param('id')
        const updateUser = await c.req.json()

        const currentEmail = await getUserService('email', updateUser.email)
        if (currentEmail.length !== 0) {
            throw new AppError('Email already exists', 403)
        }

        const currentUsername = await getUserService(
            'username',
            updateUser.username
        )
        if (currentUsername.length !== 0) {
            throw new AppError('Username already exists', 403)
        }

        const updatedUser = await db('users')
            .where('id', '=', id)
            .update(updateUser)
            .returning('*')

        if (updatedUser.length === 0) {
            throw new AppError('User not found', 404)
        }
        return c.json({ message: 'updated', data: updatedUser })
    } catch (error) {
        logger.error(error.message)
        return c.json({ error: error.message }, error.statusCode || 500)
    }
}

export const deleteUserService = async (c) => {
    try {
        const id = c.req.param('id')
        const deleteUser = await db('users')
            .where('id', '=', id)
            .del()
            .returning('*')

        if (deleteUser.length === 0) {
            throw new AppError('User not found', 404)
        }

        return c.json({ message: 'deleted', data: deleteUser })
    } catch (error) {
        logger.error(error.message)
        return c.json({ error: error.message }, error.statusCode || 500)
    }
}
