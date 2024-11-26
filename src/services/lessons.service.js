import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getLessonsSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('lessons')
                break;
            case 'id':
                result = await db.select().from('lessons').where('id', '=', date)
                break
            case 'search':
                result = await db.select().from('lessons').whereILike(`title`, `%${date}%`)
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createLessonsService = async(lesson) =>{
    try {
        const newData = await db('lessons').insert(lesson).returning("*")
        return newData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updatLessonSersice = async(lesson, id) =>{
    try {
        const currentData = await getLessonsSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("lesson not found", 404)
        }

        const updateData = await db('lessons').where('id', '=', id).update(lesson)
        return updateData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteLessonSersice = async(id) =>{
    try {
        const currentData = await getLessonsSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("lesson not found", 404)
        }


        const deleteData = await db('lessons').where('id', '=', id).del().returning('*')
        return deleteData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}