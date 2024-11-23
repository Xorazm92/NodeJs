import db from '../db/index.js'
import { hashPassword } from '../utils/hash/index.js'

export const UsersService = {
    create: async (user) => {
        try {
            const {email} = user
            const existsUser = await db('users').select('*').where('email', '=', email)

            if(existsUser.length > 0){
                return {
                    success: true,
                    status: 400,
                    message: 'Email allaqachon band'
                }
            }

            user.password = await hashPassword(user.password)

            const result = await db('users').insert(user).returning("*")
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'User yaratilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: result
            }
        } catch (error) {
            throw new Error(error)
        }
    },

    getAll: async (page, limit) => {
        try {
            const offset = (page - 1) * limit
            const result = await db('users').select("*").limit(limit).offset(offset)
            if(result.length === 0){
                return {
                    success: false,
                    status: 400,
                    message: 'Userlar topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: result
            }
        } catch (error) {
            throw new Error(error)
        }
    },

    getOne: async (id) => {
        try {
            const result = await db('users').select("*").where('id', id)
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'User topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: result
            }
        } catch (error) {
            throw new Error(error)
        }
    }, 

    update: async (id, data) => {
        try {
            const result = await db('users').update(data).where('id', id).returning('*')
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'User topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: result
            }
        } catch (error) {
            throw new Error(error)
        }
    },

    delete: async (id) => {
        try {
            const result = await db('users').delete().where('id', id)
            if(result === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'User topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: 'User muvaffaqiyatli o\'chirildi'
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
