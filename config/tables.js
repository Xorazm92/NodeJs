import pool from "./db.js";

export const createTable = async () => {
  try {
    await pool.query(`
            create table if not exists users (
              id SERIAL PRIMARY KEY,
              name VARCHAR(64),
              email VARCHAR(64),
              password VARCHAR(64),
              fullname VARCHAR(64),
              creat_at DATE DEFAULT CURRENT_DATE,
              update_at DATE DEFAULT CURRENT_DATE
            );
          `);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
