import  db  from '../database/index.js'

export const getallCategoryController = async (c) => {
    try {
        const page = parseInt(c.req.query.page) || 1
        const limit = parseInt(c.req.query.limit) || 10
        const skip = (page - 1) * limit

        const categories = await db('categories')
            .select('*')
            .limit(limit)
            .offset(skip)

        if (categories.length === 0) {
            return c.json({ status: 'Not Found', message: 'No category found' },200)

            return c.json({ Status: 'Success', page, limit, categories },200)
        }
    } catch (error) {
       
    }
}

export const getoneCategoryController = async (c) => {
    try {
        const id = c.req.params.id
        const category = await db('categories')
            .select('*')
            .limit(limit)
            .offset(skip)

        if (!category) {
            return c.json({ status: 'Not Found', message: 'No category found' }, 200)

            return c.json({ Status: 'Success', category },200)
        }
    } catch (error) {
   
    }
}

export const createCategoryController = async (c) => {
    try {
        const newCategory = await db('categories')
            .insert(c.req.body)
            .returning('*')

        return c.json({
            status: 'Created',
            category: newCategory[0],
        },201)
    } catch (error) {
        logger.error(error)
  
    }
}

export const updateCategoryController = async (req, res, next) => {
    try {
        const id = c.req.params('id')
        const updates = c.req.body

        const updated = await db('categories')
            .where({ id })
            .update(updates)
            .returning('*')

        if (updated.length === 0) {
            return c.json({ status: 'Not Found', message: 'No Category found' },404)
        }
    } catch (error) {

    }
}

export const deleteCategoryController = async (c) => {
    try {
        const id = c.req.params("id")

        const deleted = await db('categories').where({ id }).del()

        if (!deleted) {
            return c.json({
                status: 'Not Found',
                message: 'No category found',
            },404)
        }
        return rc.json({
            status: 'Deleted',

            message: 'Category deleted Successfully',
        },200)
    } catch (error) {

    }
}
