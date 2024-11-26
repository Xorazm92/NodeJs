import { createCoursesService, deleteCoursesSersice, getCoursesSersice, updatCourseSersice } from '../services/index.service.js'
import { logger, AppError } from '../utils/index.js'

export const createCoursesController = async (req, res, next) =>{
    try {
        const body = req.body
        const newCourses = await createCoursesService(body)
        return res.status(201).send({
            message: 'created',
            data: newCourses.id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getAllCoursesController = async (req, res, next) =>{
    try {
        const allCourses = await getCoursesSersice('all')
        return res.status(201).send({
            message: 'success',
            data: allCourses
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const getByIdCoursesController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const course = await getCoursesSersice('id', id)

        if(course.length === 0){
            throw new AppError('course not found', 404)
        }
        return res.status(201).send({
            message: 'success',
            data: course
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const searchCoursesController = async (req, res, next) =>{
    try {
        const {search} = req.query
        
        const courses = await getCoursesSersice('search', search)

        if(courses.length === 0){
            throw new AppError('courses not found', 404)
        }

        return res.status(201).send({
            message: 'success',
            data: courses
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const updateCoursesController = async (req, res, next) =>{
    try {
        const id = req.params.id        
        const body = req.body
        const course = await updatCourseSersice(body, id)

        return res.status(200).send({
            message: 'success',
            data: course[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

export const deleteCoursesController = async (req, res, next) =>{
    try {
        const id = req.params.id
        const deleteCourses = await deleteCoursesSersice(id)

        return res.status(200).send({
            message: 'success',
            data: deleteCourses[0].id
        })
    } catch (error) {
        logger.error(error)
        next(error)
    }
}