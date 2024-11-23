import { pool } from "../database/index.js";



export const createStudentTable = async ()=>{
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        permission BOOLEAN,
        user_id INT REFERENCES user(id) ON DELETE CASCADE,
        
      )  
      `)
  } catch (error) {
    throw new Error(error.message)
  }
}