import db from '../db/index.js'

export const StudentsService = {
    create: async (student) => {
        try {
            const result = await db('students').insert(student).returning("*")
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Student yaratilmadi'
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
            const result = await db('students').select("*").limit(limit).offset(offset)
            if(result.length === 0){
                return {
                    success: false,
                    status: 400,
                    message: 'Studentlar topilmadi'
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
            const result = await db('students').select("*").where('id', id)
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Student topilmadi'
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
            const result = await db('students').update(data).where('id', id).returning('*')
            if(result.length === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Student topilmadi'
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
            const result = await db('students').delete().where('id', id)
            if(result === 0){
                return {
                    success: false,
                    status: 404,
                    message: 'Student topilmadi'
                }
            }
            return {
                success: true,
                status: 200,
                message: 'Student muvaffaqiyatli o\'chirildi'
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}
