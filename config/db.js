import pg from "pg";
import dotenv from "dotenv"

dotenv.config()

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

export const connectDatabase = async () => {
  try {
    const client = await pool.connect();
    console.log("All the tables are created!", client.database);

    client.release()
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};

export default pool