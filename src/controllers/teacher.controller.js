import { createTeacherService, deleteTeacherSersice, getTeacherSersice, updatTeacherSersice } from '../services/index.service.js'
import { AppError, logger } from '../utils/index.js'

export const createTeacherController = async (req, res, next) =>{
    try {
        const body = req.body
        const newData = await createTeacherService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllTeacherController = async (req, res, next) =>{
    try {
        const allData = await getTeacherSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allData
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdTeacherController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await getTeacherSersice('id', id)
        
        if(data.length === 0){
            throw new AppError('teacher not found', 404)
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


export const updateTeacherController = async (req, res, next) =>{
    try {
        const id = req.params.id        
        const body = req.body
        const course = await updatTeacherSersice(body, id)


        return res.status(200).send({
            message: 'success',
            data: course[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteTeacherController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteData = await deleteTeacherSersice(id)

        return res.status(200).send({
            message: 'success',
            data: deleteData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}