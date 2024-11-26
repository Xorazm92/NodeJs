import { config } from "dotenv"

config()

export default {
    app: {
        port: process.env.PORT
    }
}