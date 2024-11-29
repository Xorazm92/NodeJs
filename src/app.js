import { Hono } from 'hono'
import { logger } from './utils/index.js'
import routers from './routers/index.js'

const app = new Hono()

// Router'larni ulash
app.route('/api/v1', routers)

// Xatolarni boshqarish
app.onError((err, c) => {
    logger.error(err.message)
    return c.json(
        {
            success: false,
            message: err.message || 'Internal Server Error',
        },
        c.status || 500
    )
})

// Node.js'ning `process` xatolarini boshqarish
process.on('uncaughtException', (err) => {
    logger.error(err.message)
    process.exit(1)
})

export default app
