import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js"; 

dotenv.config();
const app = express();

// body-parser modulini o'rniga express.json() dan foydalaning
app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/trelloClone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB ulanish o'rnatildi"))
.catch((error) => console.log("MongoDB ulanishda xatolik:", error));

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
