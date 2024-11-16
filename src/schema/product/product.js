import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const createProductTable = async()=>{
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS social(
            id SERIAL PRIMARY KEY,
            category_id INT REFERENCES category(id) ON DELETE CASCADE,
            title VARCHAR,
            picture VARCHAR,
            summary VARCHAR NOT NULL,
            description VARCHAR NOT NULL,
            price  REAL NOT NULL,
            discount_type VARCHAR,
            discount_value REAL NOT NULL,,
            tag ARRAY NOT NULL,
            created_at TIMESTAMPTZ,
            updated_at TIMESTAMPTZ
          
            )`
        )
        
    } catch (error) {
        logger.error(error)
    }
}