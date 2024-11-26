import knex from "knex";
import { config } from "../configs/index.js";

const db = knex({
    client: 'pg',
    connection: {
        host: config.pg.db_host,
        user: config.pg.db_user,
        port: config.pg.db_port,
        password: config.pg.db_password,
        database: config.pg.db_name
    }
})

export default db
