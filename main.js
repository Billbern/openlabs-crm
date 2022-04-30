const express = require("express");
const path = require("path");


const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/assets')));


const auth = require('./routes/auth');
const student = require("./routes/student");
const company = require("./routes/company");

app.use('/auth', auth);
app.use('/student', student);
app.use('/company', company);


app.get("/documentation", (req, res)=>{
    res.render("index")
})

app.get("*", (req, res)=>{
    res.render("404_page", { title: 'User'})
})


app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:${port}\nfor the docs page visit http://localhost:${port}/documentation`)
})