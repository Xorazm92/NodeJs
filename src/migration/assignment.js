import { pool } from "../database/index.js";



export const createAssigmentTable = async ()=>{
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product (
        id SERIAL PRIMARY KEY,
        course_id INT REFERENCES course(id) ON DELETE CASCADE,
        student_id INT REFERENCES student(id) ON DELETE CASCADE,
        teacher_id INT REFERENCES teacher(id) ON DELETE CASCADE
      )  
      `)
  } catch (error) {
    throw new Error(error.message)
  }
}