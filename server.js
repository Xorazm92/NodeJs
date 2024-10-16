import express from "express";
import authRouter from "./routes/auth.router.js"
import path from "path"; 

const app = express()
app.use(express.json())

app.use("/auth", authRouter)

app.use((err, req, res, next) => {
  const { message, name, stack } = err

  res.status(400).send({ message, name, stack })
})

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


app.listen(4000, () => {
  console.log(4000)
})