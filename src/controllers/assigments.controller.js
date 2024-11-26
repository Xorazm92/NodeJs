import { createAssigmentsService, getAssigmentSersice } from '../services/index.service.js'
import { AppError, logger } from '../utils/index.js'

export const createAssigmentController = async (req, res, next) =>{
    try {
        const body = req.body
        const newData = await createAssigmentsService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllAssigmentController = async (req, res, next) =>{
    try {
        const allData = await getAssigmentSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allData
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdAssigmentController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await getAssigmentSersice('id', id)
        
        if(data.length === 0){
            throw new AppError('assigment not found', 404)
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


export const updateAssigmentController = async (req, res, next) =>{
    try {
        const id = req.params.id        
        const body = req.body
        const course = await updatAssigmentSersice(body, id)


        return res.status(200).send({
            message: 'success',
            data: course[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteAssigmentController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteData = await deleteAssigmentSersice(id)

        return res.status(200).send({
            message: 'success',
            data: deleteData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}