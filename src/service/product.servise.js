import pool from '../database/index.js'

export const getAllProductsService = async () => {
    try {
        const allData = await pool.query('SELECT * FROM product')
        return allData.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const getByIdProductsService = async (id) => {
    try {
        const allData = await pool.query(
            'SELECT * FROM product where id = $1',
            [id]
        )
        if (allData.rowCount === 0) {
            return { status: 'NOTFOUND' }
        }
        return { data: allData.rows }
    } catch (error) {
        throw new Error(error)
    }
}

export const createProductsService = async (data) => {
    try {
        const {
            category_id,
            title,
            picture,
            sammary,
            description,
            price,
            discount_type,
            discount_value,
            tags,
        } = data
        const allData = await pool.query(
            `
            INSERT INTO product(category_id ,title ,picture ,sammary ,description ,price ,discount_type ,discount_value ,tags )VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *
            `,
            [
                category_id,
                title,
                picture,
                sammary,
                description,
                price,
                discount_type,
                discount_value,
                tags,
            ]
        )

        return allData.rows
    } catch (error) {
        throw new Error(error)
    }
}

export const updateProductsService = async (id, data) => {
    try {
        const {
            category_id,
            title,
            picture,
            sammary,
            description,
            price,
            discount_type,
            discount_value,
            tags,
        } = data
        const Products = await pool.query(
            'SELECT * FROM product where id = $1',
            [id]
        )
        if (Products.rowCount === 0) {
            return { status: 'NOTFUND' }
        }
        const updateCategor = await pool.query(
            `UPDATE product SET category_id  = $1,title  = $2,picture  = $3,sammary  = $4,description  = $5,price  = $6,discount_type  = $7,discount_value  = $8,tags = $9 WHERE id = $10`, [
                category_id || Products.rows[0].category_id,
                title || Products.rows[0].title,
                picture ||  Products.rows[0].price,
                sammary ||  Products.rows[0].sammary,
                description ||  Products.rows[0].description,
                price || Products.rows[0]. price,
                discount_type || Products.rows[0].discount_type,
                discount_value || Products.rows[0].discount_value,
                tags || Products.rows[0].tags,
                id
            ]
        )
        return { status: 'Success' }
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteProductsService = async (id) => {
    try {
        const Products = await pool.query(
            'SELECT * FROM product where id = $1',
            [id]
        )
        if (Products.rowCount === 0) {
            return { status: 'NOTFUND' }
        }
        await pool.query(`DELETE FROM product WHERE id = $1`, [id])
        return { status: 'Success' }
    } catch (error) {
        throw new Error(error)
    }
}
