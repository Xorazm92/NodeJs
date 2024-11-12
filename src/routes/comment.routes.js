import { Router } from "express";
import { authGuard } from "../middleware/index.js";

import { addComment, deleteComment, getComment, updateComment } from "../controllers/comments.controller";

export const commentRouter = new Router();

commentRouter.get("/", authGuard, getComment);

commentRouter.post('/', authGuard, addComment)

commentRouter.put("/:id", authGuard, updateComment);

commentRouter.delete("/:id", authGuard, deleteComment);



