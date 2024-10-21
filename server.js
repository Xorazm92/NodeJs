import express from "express";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weather.routes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send({ message: err.message });
    } else {
        res.status(404).send({ message: "Xabar yo'q" });
    }
});

app.listen(PORT, () => {
    console.log(`Serverimiz port: ${PORT} da ishlamoqda`);
});

export default app;
