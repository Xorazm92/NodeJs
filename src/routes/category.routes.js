import { Router } from "express";
import { authGuard, roleGuard } from "../middleware/index.js";
import {
  addCategory,
  deleteCategoryById,
  getCategory,
  updateCategoryById,
} from "../controllers/category.Controller.js";

export const categoryRouter = new Router();

categoryRouter.get("/", getCategory);
categoryRouter.post(
  "/",
  authGuard,
  roleGuard("admin", "superAdmin"),
  addCategory
);
categoryRouter.put(
  "/:id",
  authGuard,
  roleGuard("admin", "superAdmin"),
  updateCategoryById
);
categoryRouter.delete(
  "/:id",
  authGuard,
  roleGuard("admin", "superAdmin"),
  deleteCategoryById
);
