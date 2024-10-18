import express from "express";
import { config } from "dotenv";
import { productsRouter } from "./router/index.js";

config()

const PORT = process.env.PORT
const app = express()
app.use(express.json())


app.use("/products", productsRouter)



app.use((err, req, res, next) => {
  if (err)
    return res.send({ message: err.message })

  return res.status(404).send({
    message: "NOT FOUND"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} http://localhost:${PORT}`)
})
