import app from "./src/app.js"
import { config } from "./src/config/index.js"

const bootstarp = () => {
    app.listen(config.app.PORT, () => {
        console.log(`SErver is running on: ${config.app.PORT}`)
    })
}

bootstarp()