import express from "express";
import bodyParser from "body-parser";
import blogRouter from "./routes/blog.router.js";
import path from "path";

const app = express();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));
app.use("/blogs", blogRouter);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(5005, () => {
  console.log('Port 5005 da');
});
