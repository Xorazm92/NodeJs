import express from "express";
import morgan from "morgan";
import session from "express-session";


import {
  assigmentsRouter,
  authRouter,
  homeworkRouter,
  lessonsRouter,
  studentsRouter,
  teachersRouter,
  usersRouter,
} from "./routers/index.routes.js";
import { logger } from "./utils/logger.js";
import { config } from "./configs/index.js";

const app = express();

app.use(
  session({
    secret: config.google_app.session_secret,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(morgan());
app.use(express.urlencoded({ extended: true }));



app.use("/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/courses", lessonsRouter);
app.use("/api/v1/students", studentsRouter);
app.use("/api/v1/teachers", teachersRouter);
app.use("/api/v1/assigments", assigmentsRouter);
app.use("/api/v1/homeworks", homeworkRouter);
app.use("/api/v1/lessons", lessonsRouter);


app.use((err, req, res, next) => {
  if (err) {
    logger.error("Error:", err);
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection:", reason);
  process.exit(1);
});
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});
export default app;
