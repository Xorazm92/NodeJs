import { pool } from "../database/index.js";



export const createCourseTable = async ()=>{
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        description TEXT,
        start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
      )  
      `)
  } catch (error) {
    throw new Error(error.message)
  }
}