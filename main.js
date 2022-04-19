const express = require("express");
const path = require("path");


const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/assets')));


app.get("/", (req, res)=>{
    res.render("index")
})


app.listen(3000, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})