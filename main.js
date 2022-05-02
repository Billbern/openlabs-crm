// import modules
const express = require("express");
const path = require("path");

// initialise express and set port
const app = express()
const port = process.env.PORT || 3000

// set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/assets')));

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

// all other routes
app.get("*", (req, res)=>{
    res.render("404_page", { title: 'User'})
})


app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:${port}\nfor the docs page visit http://localhost:${port}/documentation`)
})