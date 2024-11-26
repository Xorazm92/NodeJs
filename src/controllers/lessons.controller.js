import { createLessonsService, deleteLessonSersice, getLessonsSersice, updatLessonSersice } from '../services/index.service.js'

import { logger, AppError } from '../utils/index.js'

export const createLessonsController = async (req, res, next) =>{
    try {
        const body = req.body
        const newData = await createLessonsService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllLessonsController = async (req, res, next) =>{
    try {
        const allData = await getLessonsSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allData
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdLessonsController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await getLessonsSersice('id', id)

        if(data.length === 0){
            throw new AppError('lesson not found', 404)
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

export const searchLessonsController = async (req, res, next) =>{
    try {
        const {search} = req.query
        
        const data = await getLessonsSersice('search', search)

        if(data.length === 0){
            throw new AppError('lesson not found', 404)
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

export const updateLessonsController = async (req, res, next) =>{
    try {
        const id = req.params.id
            
        const body = req.body
        const data = await updatLessonSersice(body, id)

        return res.status(200).send({
            message: 'success',
            data: data
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteLessonsController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteData = await deleteLessonSersice(id)

        return res.status(200).send({
            message: 'success',
            data: deleteData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}