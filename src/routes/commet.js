import { Router } from 'express'

export const commentRouter = Router()

//all // paginatin // filter
commentRouter.get('/:slug', commentController.register)
// get by slug
commentRouter.get('/:slug/:id', commentController.register)
//create
commentRouter.post('/:slug', commentController.login)
//update by slug
commentRouter.put('/:slug/:id', commentController.login)
//delte by slug
commentRouter.delete('/:slug/:id', commentController.login)
