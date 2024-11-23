import { config } from "dotenv";
import pg from "pg";
import knex from 'knex'
config();

export const pool = new pg.Pool({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10)
});
