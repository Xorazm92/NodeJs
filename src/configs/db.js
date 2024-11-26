import { config } from "dotenv"


config()

export default {
    pg: {
        db_host: process.env.DB_HOST,
        db_user: process.env.DB_USER,
        db_port: process.env.DB_PORT,
        db_password: process.env.DB_PASSWORD,
        db_name: process.env.DB_DATABASE
    }
}