import db from '../db/index.js'

export const TeachersService = {
    create: async (teacher) => {
        try {
            const result = await db('teachers').insert(teacher).returning("*")
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Teacher yaratilmadi'
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
            const result = await db('teachers').select("*").limit(limit).offset(offset)
            if(result.length === 0){
                return {
                    success: false,
                    status: 400,
                    message: 'Teacherlar topilmadi'
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
            const result = await db('teachers').select("*").where('id', id)
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Teacher topilmadi'
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
            const result = await db('teachers').update(data).where('id', id).returning('*')
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Teacher topilmadi'
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
            const result = await db('teachers').delete().where('id', id)
            if(result === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Teacher topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: 'Teacher muvaffaqiyatli o\'chirildi'
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
