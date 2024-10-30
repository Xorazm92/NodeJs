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
