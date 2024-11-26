import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getTeacherSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('teachers')
                break;
            case 'id':
                result = await db.select().from('teachers').where('id', '=', date)
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createTeacherService = async(teacher) =>{
    try {
        const currentUser = await db.select().from('users').where('id', '=', teacher.user_id)
        if(currentUser.length === 0){
            throw new AppError('user id not found', 404)
        }
        const newData = await db('teachers').insert(teacher).returning("*")
        return newData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updatTeacherSersice = async(students, id) =>{
    try {
        const currentData = await getTeacherSersice('id', id)
        
        if(currentData.length === 0){
            throw new AppError("teacher not found", 404)
        }

        const updateData = await db('teachers').where('id', '=', id).update(students)
        return updateData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteTeacherSersice = async(id) =>{
    try {
        const currentData = await getTeacherSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("teacher not found", 404)
        }


        const deleteCourses = await db('teachers').where('id', '=', id).del().returning('*')
        return deleteCourses
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}