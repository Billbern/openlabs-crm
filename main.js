// import modules
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// initialise express and set port
const app = express()
const port = process.env.PORT || 3000

// set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/assets')));

// importing the various models
const Users = require("./models/user");
const Roles = require("./models/role");

// try creating database connection
try {
    mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true}) 
} catch (error) {
    console.log(error)
}


// import various routes
const auth = require('./routes/auth');
const student = require("./routes/student");
const company = require("./routes/company");

// use impoted routes
app.use('/auth', auth);
app.use('/student', student);
app.use('/company', company);

// documentation routes
app.get("/documentation", (req, res)=>{
    res.render("index")
})

app.get('/', (req, res)=>{
    if(true){
        res.redirect('/auth/login')
    }
})

// all other routes
app.get("*", (req, res)=>{
    res.render("404_page", { title: 'User'})
})


app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server is running on http://localhost:${port}\nfor the docs page visit http://localhost:${port}/documentation`)
})