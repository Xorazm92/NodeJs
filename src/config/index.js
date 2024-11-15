import db from "./db.js";
import application from './app.js'

export const config = {
    ...db,
    ...application
}

