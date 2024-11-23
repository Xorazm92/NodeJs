import { UsersService } from "../service/index.js";


const responseHandler = (res, result) => {
    if(!result.success){
        return res.status(result.status).send(result.message)
    }
    return res.status(result.status).send(result.message)
}

export const UsersController = {
    create: async (req, res, next) => {
        try {
            const result = await UsersService.create(req.body) 
            responseHandler(res, result)
        } catch (error) {
            next(error)
        }
    },
    getAll: async (req, res, next) => {
        try {
            const page = req.query.page || 1
            const limit = req.query.limit || 10
            const result = await UsersService.getAll(page, limit) 
            responseHandler(res, result)
        } catch (error) {
            next(error)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await UsersService.getOne(id) 
            responseHandler(res, result)
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await UsersService.update(id, data) 
            responseHandler(res, result)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await UsersService.delete(id) 
            responseHandler(res, result)
        } catch (error) {
            next(error)
        }
    },
}