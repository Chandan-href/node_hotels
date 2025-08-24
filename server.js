// const _ = require("lodash");

// function add(a, b) {
//     return a+b;
// }

// let result = add(77,8);

// console.log(result);

// // npm package lodash of node js - > used for many short time calculation or work.. having many function of methods inside it whis we see in the documention.

// let data = ["person", "person", 1, 2, 1, 2, "name","age", 2];

// let filter = _.uniq(data);

// console.log(filter);

// console.log(_.isString("chandan"));


const express = require("express");
const app = express();
const db = require("./db");
const passport = require("./auth");


 

const bodyParser = require("body-parser");
app.use(bodyParser.json());    //req.body


//import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', (req, res) => {    
  res.send('Hello Welcome to the hotel');
})


//use the routers
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/items', menuRoutes);



app.listen(3000, () => {
    console.log("server is Listening to the port 3000");
});