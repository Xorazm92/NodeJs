import express from "express";
import {productController} from "../controllers/index.js";

export const productRouter = express.Router();

productRouter.post("/", productController.createProduct);
productRouter.get("/", productController.getAllProducts);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

productRouter.get("/", productController.getFilterProducts);




