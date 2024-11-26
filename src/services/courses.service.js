import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getCoursesSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('courses')
                break;
            case 'id':
                result = await db.select().from('courses').where('id', '=', date)
                break
            case 'search':
                result = await db.select().from('courses').whereILike(`name`, `%${date}%`)
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createCoursesService = async(courses) =>{
    try {
        const newCourses = await db('courses').insert(courses).returning("*")
        return newCourses
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updatCourseSersice = async(courses, id) =>{
    try {
        const currentCourse = await getCoursesSersice('id', id)
        if(currentCourse.length === 0){
            throw new AppError("course not found", 404)
        }

        const updateCourse = await db('courses').where('id', '=', id).update(courses)
        return updateCourse
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteCoursesSersice = async(id) =>{
    try {
        const currentCourse = await getCoursesSersice('id', id)
        if(currentCourse.length === 0){
            throw new AppError("course not found", 404)
        }


        const deleteCourses = await db('courses').where('id', '=', id).del().returning('*')
        return deleteCourses
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}