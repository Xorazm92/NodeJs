import { pool } from "../database/index.js";



export const createTeacherTable = async ()=>{
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teachers (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES user(id) ON DELETE CASCADE,
        
      )  
      `)
  } catch (error) {
    throw new Error(error.message)
  }
}