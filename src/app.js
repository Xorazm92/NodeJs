import express from 'express'
import Routes from './routes/index.js'


const app = express()
app.use(express.json())

app.use('/assigments', Routes.assigmentRouter)
app.use('/courses', Routes.courseRouter)
app.use('/students', Routes.studentsRouter)
app.use('/teachers', Routes.teachersRouter)
app.use('/users', Routes.usersRouter)
app.use('/auth', Routes.authRouter)


export default app