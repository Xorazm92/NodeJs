import db from '../db/index.js'


export const CoursesService = {
    create: async (assigment) => {
        try {
            const result = await db('courses').insert(assigment).returning("*")
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Course yaratilmadi'
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
            const result = await db('courses').select("*").limit(limit).offset(offset)
            if(result.length === 0){
                return {
                    success: false,
                    status: 400,
                    message: 'Course topilmadi'
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
            const result = await db('courses').select("*").where('id', id)
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Course topilmadi'
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
            const result = await db('courses').update(data).where('id', id).returning('*')
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Course topilmadi'
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
            const result = await db('courses').delete().where('id', id)
            if(result === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Course topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: 'Course muvaffaqiyatli o\'chirildi'
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
