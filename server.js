import express from "express";
import { config } from "dotenv";
import { autherRouter, categoryRouter } from "./router/index.js";
config();

const app = express();
app.use(express.json());

app.use("/auther", autherRouter);
app.use("/category", categoryRouter);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server-port: ${[port]}`);
});
