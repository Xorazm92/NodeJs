import { 
    createStudentService, 
    deleteStudentSersice, 
    getStudentSersice, 
    updatStudentSersice
} from '../services/index.service.js'
import { AppError, logger } from '../utils/index.js'

export const createStudentController = async (req, res, next) =>{
    try {
        const body = req.body
        const newData = await createStudentService(body)
        return res.status(201).send({
            message: 'created',
            data: newData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllStudentController = async (req, res, next) =>{
    try {
        const allData = await getStudentSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allData
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdStudentController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const data = await getStudentSersice('id', id)
        
        if(data.length === 0){
            throw new AppError('student not found', 404)
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


export const updateStudentController = async (req, res, next) =>{
    try {
        const id = req.params.id        
        const body = req.body
        const course = await updatStudentSersice(body, id)


        return res.status(200).send({
            message: 'success',
            data: course[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteStudentController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteData = await deleteStudentSersice(id)

        return res.status(200).send({
            message: 'success',
            data: deleteData[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}