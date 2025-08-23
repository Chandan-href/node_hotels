const mongoose = require("mongoose");

//Define up MongoDB connection
const mongoURL = 'mongodb://localhost:27017/hotels'  //replace hotels with you database name.

//set up mongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representation the mongoDB connection.

const db = mongoose.connection;

//Define event Listeners for database connection

db.on("connected", () => {
    console.log("connected to MongoDb server");
});

db.on("error", (error) => {
    console.log("MongoDb connection error");
});

db.on("disconnected", () => {
    console.log("MongoDb disconnected");
});

//export the database connection

module.exports = db;


// "name": "Clice",
// "age": 28,
// "work": "Chef",
// "mobile": "1234-5678-88",
// "email": "Chandan@gmail.com",
// "address": "chandwara, Ranchi",
// "salary": 60000