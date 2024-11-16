import express from 'express'
import morgan from 'morgan'
import { config } from './config/index.js'
import { logger } from './utils/logger.js'
import { createUserTable } from './schema/users/users.schema.js'
import { authRouter, userRouter } from './routes/index.js'
import { error } from 'winston'
app.use(express.urlencoded({ extended: true }))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRoutes)
app.get('/api/v1/setup', async(req, res) => {
    await createUserTable()
    res.send('Table created!!!')
})

app.use((err, req, res, next) => {
    if (err) {
        return res.send(err.message)
    }
    return res.send('not found')
})

export default app



// Serverni ishga tushirish
const PORT = config.port || 3000 // config faylidan portni olish
app.listen(PORT, () => {
    logger.info(`Server ${PORT} portida ishga tushdi.`)
})
