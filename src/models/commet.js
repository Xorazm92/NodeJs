import { DataTypes, Model } from 'sequelize'
import db from '../db/index.js'
import { User } from './user.js'
import { Post } from './post.js'

export class Comment extends Model {}

//post
Comment.hasOne(User)
//comment
Comment.hasMany(Post)

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
        db,
        modelName: 'Comment',
    },
)
;(async () => {
    await db.sync({ force: true })
    // Code here
})()
