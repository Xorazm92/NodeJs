import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import {
  addArticle,
  deleteArticleById,
  getArticle,
  updateArticleById,
} from "../controllers/article.controller.js";

export const articleRouter = new Router();

articleRouter.get("/", getArticle);
articleRouter.post(
  "/",
  authGuard,
  roleGuard("admin", "superAdmin"),
  addArticle
);
articleRouter.put(
  "/:id",
  authGuard,
  roleGuard("admin", "superAdmin"),
  updateArticleById
);
articleRouter.delete(
  "/:id",
  authGuard,
  roleGuard("admin", "superAdmin"),
  deleteArticleById
);
