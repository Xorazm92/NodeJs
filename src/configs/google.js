import { config } from "dotenv"
config()

export default {
    google_app: {
        google_id: process.env.GOOGLE_CLIENT_ID,
        google_secret: process.env.GOOGLE_CLIENT_SECRET,
        session_secret:  process.env.SESSION_SECRET 
    }
}