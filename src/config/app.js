import { config } from "dotenv";

config()

export default {
    app: {
        PORT: process.env.PORT
    }
}