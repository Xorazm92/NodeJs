import express from 'express'

import { Sequelize, DataTypes, Model } from 'sequelize'
import { authRouter, postRouter, commentRouter } from './routes/index.js'

const sequelize = new Sequelize(
    'postgres://postgres:postgres@localhost:5432/orm_test',
)

try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
} catch (error) {
    console.error('Unable to connect to the database:', error)
}

const app = express()

class User extends Model {}

User.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    },
)

export class Post extends Model {}

Post.init(
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
        },
    },
    {
        // Other model options go here
        sequelize,
        modelName: 'Post', // We need to choose the model name
    },
)
export class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Comment',
    },
)

app.use('/setup', (req, res) => {
    const user = new User({
        firstName: 'ali',
        lastName: 'valiyev',
        email: 'ali@gmail.com',
    })

    user.save()
})

app.use('/auth', authRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)

app.listen(5000)
