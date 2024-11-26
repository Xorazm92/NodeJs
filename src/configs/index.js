import app from './app.js'
import db from './db.js'
import google_app from './google.js'

export const config = {
    ...db,
    ...app,
    ...google_app
}
