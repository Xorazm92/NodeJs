

// const express = require("express");
// const path = require("path");
// const bcrypt = require("bcrypt");
// const { log } = require("console");
// const collection = require("./config")

// const app = express();
// app.use(express.json())
// app.use(express.urlencoded(extended: false))

// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//     res.render("login");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup"); // Agar "signup" sahifasini ko'rsatmoqchi bo'lsangiz, bu yerda "signup" deb yozing
// });

// app.post("/signup", async(req, res) => {
//    const data = {
//     name:req.body.username,
//     password:req.body.passwor
//    }


//    const existingUser = await collection.findOne({name:data.name})
//    if(existingUser){
//     res.send("user alarady")
//    }
//    else{
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(data.password, saltRounds)

//     data.password = hashedPassword

//     const userdata = await collection.insertMany(data);
//     console.log(userdata);
//    }

   
// });

// app.post("/login", async(req, res) => {
//     try {
//         const check = await collection.findOne(name:req.body.username)
//         if(!check){
//             res.send("user name cannot found")

//         if(isPasswordmatch)
//           res.render ("home ")
//         }
//         else {
//             req.send("wrong password")
//         }
//     } catch  {
//         res.send("wrong")
        
//     }
//     const data = {
//      name:req.body.username,
//      password:req.body.passwor
//     }

// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`); // Backtick bilan o'ralgan
// });


const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();
const port = 3000; 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "../views"));
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

    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists");
    } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        const userdata = await collection.insertOne(data); 
        console.log(userdata);
        res.send("User registered successfully"); 
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
        console.error(error); 
        res.send("An error occurred");
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`); // Backtick bilan o'ralgan
});
