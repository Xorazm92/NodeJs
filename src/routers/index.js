import { Hono } from 'hono'
import { categoryRouter } from './category.routes.js'
import { usersRouter } from './users.routes.js'
import { reviewRouter } from './post.routes.js'

export const routers = new Hono()

routers.use('/categorys', categoryRouter)
routers.use('/users', usersRouter)
routers.use('/rewiew', reviewRouter)
