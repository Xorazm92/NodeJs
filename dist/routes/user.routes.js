"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.getAllData);
router.get("/:id", user_controller_1.getOneData);
router.post("/", user_controller_1.createData);
router.put("/:id", user_controller_1.updateData);
router.delete("/:id", user_controller_1.deleteData);
exports.default = router;
//# sourceMappingURL=user.routes.js.map