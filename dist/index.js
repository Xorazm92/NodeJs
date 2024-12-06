"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1", index_routes_1.default);
app.use((req, res) => {
    res.status(404).send({ message: "Route is not found!" });
});
app.use((err, req, res, next) => {
    res.status(500).send({ error: err.message });
});
app.listen(3000, () => {
    console.log("Proyekt ishladi");
});
//# sourceMappingURL=index.js.map