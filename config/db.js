import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "root",
  port: 5432,
});

export const createTables = async () => {
    try {
      await pool.query(`

            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                email VARCHAR,
                password BIGINT,
                fullname VARCHAR,
                creat_at DATE,
                update_at DATE
            );

            CREATE TABLE categoriya (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                description TEXT,
                par_id BIGINT  -- Parent category ID for hierarchical structure
            );


            CREATE TABLE Seller (
                id BIGINT PRIMARY KEY,
                name VARCHAR,
                title TEXT,
                adress VARCHAR
            );

            CREATE TABLE Market (
                id SERIAL PRIMARY KEY,
                name VARCHAR,
                user_id INT,
                is_admin BIGINT,
                creat_at DATE,
                update_at DATE,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );


            CREATE TABLE product (
                id SERIAL PRIMARY KEY,
                user_id BIGINT,
                name VARCHAR,
                creat_at DATE,
                update_at DATE,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
          
          `);
      console.log('All the tables are created!');
      
    } catch (error) {
      console.log(error.message);
    }
  };
  