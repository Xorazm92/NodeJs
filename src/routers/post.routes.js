import { Hono } from 'hono'
import {
    createPostController,
    deletePostController,
    getAllPostController,
    getOnePostController,
    updatePostController,
} from '../controllers/post.controller.js'

export const reviewRouter = Hono()

reviewRouter.get('/', getAllPostController)
reviewRouter.get('/:id', getOnePostController)
reviewRouter.post('/', createPostController)
reviewRouter.put('/:id', updatePostController)
reviewRouter.delete('/:id', deletePostController)
