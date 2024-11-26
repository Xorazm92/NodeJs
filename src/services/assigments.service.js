import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getAssigmentSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('assigments')
                break;
            case 'id':
                result = await db.select().from('assigments').where('id', '=', date)
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createAssigmentsService = async(assigment) =>{
    try {
        const currentCourse = await db.select().from('courses').where('id', '=', assigment.course_id)
        if(currentCourse.length === 0){
            throw new AppError('course id not found', 404)
        }

        const currentStudent = await db.select().from('students').where('id', '=', assigment.student_id)
        if(currentStudent.length === 0){
            throw new AppError('student id not found', 404)
        }

        const currentTeacher = await db.select().from('teachers').where('id', '=', assigment.teacher_id)
        if(currentTeacher.length === 0){
            throw new AppError('teacher id not found', 404)
        }

        const newData = await db('assigments').insert(assigment).returning("*")
        return newData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updatAssigmentSersice = async(students, id) =>{
    try {
        const currentData = await getAssigmentSersice('id', id)
        
        if(currentData.length === 0){
            throw new AppError("assigment not found", 404)
        }

        const updateData = await db('assigments').where('id', '=', id).update(students)
        return updateData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteAssigmentSersice = async(id) =>{
    try {
        const currentData = await getAssigmentSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("assigment not found", 404)
        }
        const deleteCourses = await db('assigments').where('id', '=', id).del().returning('*')
        return deleteCourses
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}