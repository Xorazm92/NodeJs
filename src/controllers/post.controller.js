import db from '../database/index.js'

export const getAllPostController = async (c) => {
    try {
        const page = parseInt(c.req.query.page) || 1
        const limit = parseInt(c.req.query.limit) || 10
        const skip = (page - 1) * limit

        const post = await db('post')
            .select('*')
            .limit(limit)
            .offset(skip)

        if (post.length === 0) {
            return res.c.json({
                status: 'Not Found',
                message: 'No Review found',
            },500)
        }

        return c.json({
            status: 'Success',
            page,
            limit,
            post,
        })
    } catch (error) {

    }
}

export const getOnePostController = async (c) => {
    try {
        const id = c.req.params("id")
        const post = await db('post').select('*').where({ id }).first()

        if (post.length === 0) {
            return c.json({
                status: 'Not Found',
                message: 'No Review found',
            },404)
        }

        return c.json({
            status: 'Success',
            post,
        },200)
    } catch (error) {

    }
}

export const createPostController = async (c) => {
    try {
        const newPost = await db('post').insert(c.req.body).returning('*')

        return c.json({
            status: 'Created',
            review: newPost[0],
        },201)
    } catch (error) {

    }
}

export const updatePostController = async (c) => {
    try {
        const id = c.req.params('id')
        const updates = req.body

        const updated = await db('post')
            .where({ id })
            .update(updates)
            .returning('*')

        if (updated.length === 0) {
            return c.json({
                status: 'Not Found',
                message: 'No Review found',
            },404)
        }

        return c.json({
            status: 'Success',
            post: updated[0],
        },200)
    } catch (error) {

    }
}

export const deletePostController = async (req, res, next) => {
    try {
        const id = req.params.id

        const deleted = await db('posts').where({ id }).del()

        if (!deleted) {
            return c.json({
                status: 'Not Found',
                message: 'No Review found',
            },404)
        }

        return c.json({
            status: 'Deleted',
            message: 'Review deleted successfully',
        },201)
    } catch (error) {

    }
}
