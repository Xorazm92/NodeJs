import { logger } from "../../utils/logger.js"
import pool from "../../databases/index.js"

export const categorySchema = async()=>{
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS category(
            id SERIAL PRIMARY KEY,
            name VARCHAR,
            description TEXT NOT NULL,
            tag VARCHAR NOT NULL,
            created_at TIMESTAMPTZ,
            updated_at TIMESTAMPTZ
          
            )`
        )
        
    } catch (error) {
        logger.error(error)
    }
}