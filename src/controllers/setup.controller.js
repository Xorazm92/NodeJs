import { pool } from "../database/index.js";
import { createAssigmentTable, createCourseTable, createStudentTable, createTeacherTable, createUserTable } from "../migration/index.js";

export const setUpController = async (req, res, next) => {
  try {
    await createUserTable();
    await createTeacherTable();
    await createStudentTable();
    await createCourseTable();
    await createAssigmentTable();
    res.send("TABLES CREATED");
  } catch (error) {
    next(error);
  }
}

