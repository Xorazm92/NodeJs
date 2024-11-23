import { Router } from "express";
import { setUpController } from "../controllers/setup.controller.js";


export const setUpRoutes = new Router()




setUpRoutes.get('/setup', setUpController)
