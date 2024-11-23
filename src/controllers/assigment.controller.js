import { AssigmentsService } from "../service/index.js";


const responseHandler = (res, result) => {
    if(!result.success){
        return res.status(result.status).send(result.message)
    }
    return res.status(result.status).send(result.message)
}

export const AssigmentController = {
    create: async (req, res, next) => {
        try {
            const result = await AssigmentsService.create(req.body) 
            responseHandler(res, result)
        } catch (error) {
            next(err)
        }
    },
    getAll: async (req, res, next) => {
        try {
            const page = req.query.page || 1
            const limit = req.query.limit || 10
            const result = await AssigmentsService.getAll(page, limit) 
            responseHandler(res, result)
        } catch (error) {
            next(err)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await AssigmentsService.getOne(id) 
            responseHandler(res, result)
        } catch (error) {
            next(err)
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const data = req.body
            const result = await AssigmentsService.update(id, data) 
            responseHandler(res, result)
        } catch (error) {
            next(err)
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id
            const result = await AssigmentsService.delete(id) 
            responseHandler(res, result)
        } catch (error) {
            next(err)
        }
    },
}