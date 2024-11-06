require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB ulanishini yangilang
mongoose.connect(process.env.DB_URI) // Parametrlarni olib tashladik
    .then(() => console.log("Connection to the database!"))
    .catch((error) => console.log("MongoDB connection error:", error));

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}))
app.use((req,res,next) => {
    res.locals.message = req.session.massege;
    delete req.session.message;
    next()
})

app.set('view.engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Assalomuu Alaykum');
});

app.use("", require("./routes/routes.js"))
// Serverni ishga tushirish
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
