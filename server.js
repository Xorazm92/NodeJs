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

import express from "express";
import dotenv from "dotenv";
import { userRouter, categoryRouter, productRouter } from "./routes/index.js";
import { connectDatabase } from "./config/db.js";
import { createTable } from "./config/tables.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);

dotenv.config();
const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`Server running on ${port}`);
  await connectDatabase();
  await createTable();
});
