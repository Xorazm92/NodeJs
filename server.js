import app from './src/app.js'
import { config } from './src/config/index.js'
import { logger } from './src/utils/logger.js'
import pool from './src/databases/index.js'

const bootstrap = async () => {
    try {
        app.listen(config.app.port, () => {
            logger.info(`server ishga tushdiyov ${config.app.port}`)
        })
        logger.log((await pool.query(`SELECT now()`)).rows)
    } catch (error) {
        logger.error(error)
    }
}

bootstrap()
