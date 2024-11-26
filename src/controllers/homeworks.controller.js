import { 
    createHomeworkService,
    deleteHomeworkSersice,
    getHomeworkSersice,
    updatHomeworkSersice
} from '../services/index.service.js'

import { logger, AppError } from '../utils/index.js'

export const createHomeworkController = async (req, res, next) =>{
    try {
        const body = req.body
        const newData = await createHomeworkService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllHomeworkController = async (req, res, next) =>{
    try {
        const allData = await getHomeworkSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allData
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdHomeworkController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await getHomeworkSersice('id', id)

        if(data.length === 0){
            throw new AppError('homework not found', 404)
        }
        return res.status(201).send({
            message: 'success',
            data: data
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const searchHomeworkController = async (req, res, next) =>{
    try {
        const {search} = req.query
        
        const data = await getHomeworkSersice('search', search)

        if(data.length === 0){
            throw new AppError('courses not found', 404)
        }

        return res.status(201).send({
            message: 'success',
            data: data
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateHomeworkController = async (req, res, next) =>{
    try {
        const id = req.params.id
            
        const body = req.body
        const data = await updatHomeworkSersice(body, id)

        return res.status(200).send({
            message: 'success',
            data: data
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteHomeworkController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteData = await deleteHomeworkSersice(id)

        return res.status(200).send({
            message: 'success',
            data: deleteData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}