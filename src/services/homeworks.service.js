import { AppError, logger } from "../utils/index.js"
import db from '../database/index.js'


export const getHomeworkSersice = async(type, date = '') =>{
    try {
        let result;
        switch (type) {
            case 'all':
                result = await db.select().from('homeworks')
                break;
            case 'id':
                result = await db.select().from('homeworks').where('id', '=', date)
                break
            case 'search':
                result = await db.select().from('homeworks').whereILike(`title`, `%${date}%`)
                break
            default:
                break;
        }
        return result
    } catch (error) {
        throw new AppError(error.message, 400)
    }
}

export const createHomeworkService = async(homework) =>{
    try {
        const newData = await db('homeworks').insert(homework).returning("*")
        return newData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}

export const updatHomeworkSersice = async(homework, id) =>{
    try {
        const currentData = await getHomeworkSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("homework not found", 404)
        }

        const updateData = await db('homeworks').where('id', '=', id).update(homework)
        return updateData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}


export const deleteHomeworkSersice = async(id) =>{
    try {
        const currentData = await getHomeworkSersice('id', id)
        if(currentData.length === 0){
            throw new AppError("homework not found", 404)
        }


        const deleteData = await db('homeworks').where('id', '=', id).del().returning('*')
        return deleteData
    } catch (error) {
        logger.error(error)
        throw new AppError(error.message, 400)
    }
}