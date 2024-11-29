import app from './src/app.js'
import { logger } from './src/utils/index.js'
import { config } from './src/configs/index.js'

const execute = async () => {
    try {
        app.fire() // Hono serverni ishga tushiradi (default port: 3000)

        logger.info(`Server is running on port: ${config.app.port}`)
    } catch (error) {
        logger.error(error.message)
    }
}

execute()

