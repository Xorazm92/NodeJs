const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view", path.join(__dirname, "../view"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            return res.send("User already exists");
        }
        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.create(data);
        console.log("User registered:", userdata);
        res.send("User registered successfully");
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("An error occurred");
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        
        if (!check) {
            return res.send("Username cannot be found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        
        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send("Wrong password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred");
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
