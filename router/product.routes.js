import express from "express";
import { validationProductMidd } from '../middleware/index.js';
import { createProductController,
    getAllProductsController,
    getByIdProductController,
    updateByIdProductController,
    deleteByIdProductController } from "../controller/index.js";


export const productsRouter = express.Router()


//GET ALL
productsRouter.get("/", getAllProductsController)

//GET BY ID
productsRouter.get("/:id", getByIdProductController)

//CREATE
productsRouter.post("/", validationProductMidd, createProductController)

//UPDATE BY ID
productsRouter.put("/:id", updateByIdProductController)

//DELETE BY ID
productsRouter.delete("/:id", deleteByIdProductController)
