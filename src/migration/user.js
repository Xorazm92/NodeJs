import { pool } from "../database/index.js";

export const createUserTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                data_created TIMESTAMP DEFAULT CURRENT_TIMESTEMP,
                last_login TIMESTAMP DEFAULT CURRENT_TIMESTEMP,
                role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'menejer'))
                

            )
        `
    );
    console.log("yaratildi");
    
    } catch (error) {
        console.error("Error creating users table:", error.message);
        
        
        
    }
}

createUserTable();