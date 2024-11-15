import express from 'express'
import morgan from 'morgan'
import { config } from './config/index.js'
import { logger } from './utils/logger.js'
import { createUserTable } from './schema/users/users.schema.js'
import { userRouter } from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/v1/users', userRouter)

app.get('/setup', async(req, res) => {
    await createUserTable()
    res.send('Salom, bu Express serveri!')
})

export default app

// Serverni ishga tushirish
const PORT = config.port || 3000 // config faylidan portni olish
app.listen(PORT, () => {
    logger.info(`Server ${PORT} portida ishga tushdi.`)
})
