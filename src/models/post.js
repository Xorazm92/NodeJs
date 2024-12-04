import { DataTypes, Model } from 'sequelize'
import db from '../db/index.js'
import { User } from './user.js'

export class Post extends Model {}

//post
Post.hasOne(User)
//comment
Post.hasMany(Comment)

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
        db, // We need to pass the connection instance
        modelName: 'Post', // We need to choose the model name
    },
)
;(async () => {
    await db.sync({ force: true })
    // Code here
})()
