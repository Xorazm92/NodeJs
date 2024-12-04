import { Router } from 'express'

export const postRouter = Router()

//all // paginatin // filter
postRouter.get('/', postController.register)
// get by slug
postRouter.get('/:slug', postController.register)
//create
postRouter.post('/', postController.login)
//update by slug
postRouter.put('/:slug', postController.login)
//delte by slug
postRouter.delete('/:slug', postController.login)
