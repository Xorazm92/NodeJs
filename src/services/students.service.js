import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getStudentSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('students')
                break;
            case 'id':
                result = await db.select().from('students').where('id', '=', date)
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createStudentService = async(student) =>{
    try {
        const currentUser = await db.select().from('users').where('id', '=', student.user_id)
        if(currentUser.length === 0){
            throw new AppError('user id not found', 404)
        }
        const newData = await db('students').insert(student).returning("*")
        return newData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updatStudentSersice = async(students, id) =>{
    try {
        const currentData = await getStudentSersice('id', id)
        console.log(id);
        
        if(currentData.length === 0){
            throw new AppError("student not found", 404)
        }

        const updateData = await db('students').where('id', '=', id).update(students)
        return updateData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteStudentSersice = async(id) =>{
    try {
        const currentData = await getStudentSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("student not found", 404)
        }


        const deleteCourses = await db('students').where('id', '=', id).del().returning('*')
        return deleteCourses
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}