import app from './src/app.js'
import { config } from './src/configs/index.js'
import {logger} from './src/utils/index.js'


const connect = async() =>{
    try {
        app.listen(config.app.port, () =>{
            logger.info(`app is running on port: ${config.app.port}`)
        })
    } catch (error) {
        logger.error(error)
    }
}

connect()