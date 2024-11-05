// const mongoose =  require("mongoose")
// const connect = mongoose.connect("mongodb://localhost:27017/login-test")
// connect.then(() => {
//     console.log("Database cannot be connection");
    
// })

// const loginSchema = new mongoose.Schema({
//      name:{
//         type:String,
//         required:true
//      },
//      login:{
//         type:String,
//         required:true
//      }
// })

// const collection = new mongoose.modedl("users", loginSchema)
// module.exports = collection;

const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-test");

connect
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });

const loginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("users", loginSchema);
module.exports = collection;
