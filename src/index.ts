import express, { Request, Response, Application, NextFunction } from "express";
import routes from "./routes/index.routes";

const app: Application = express();

app.use(express.json());
app.use("/api/v1", routes);

app.use((req: Request, res: Response) => {
  res.status(404).send({ message: "Route is not found!" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proyekt ishladi");
});
