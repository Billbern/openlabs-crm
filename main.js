// import modules
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const mongoStore = require('connect-mongo');


// import various routes
const authent = require('./routes/auth');
const appusers = require("./routes/user");


// importing the various models
const Users = require("./models/user");
const Roles = require("./models/role");
// const Jobs = require("./models/jobs");
// const Tags = require("./models/tags");


// try creating database connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err){
        console.error(err)
    }
})


// initialise database on connection open

const dbinit = require("./config/dbinit"); 
mongoose.connection.on('open', async ()=>{
    console.info("Hurray database connected");
    try {
        await dbinit(bcrypt);
    } catch (error) {
        console.error(error)
    }
})


// initialise passport
const initializePassport = require("./config/passport_config");
initializePassport(passport);


// initialise express and set port
const app = express();
const port = process.env.PORT || 3000;


// set view engine and static folder
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/assets')));
app.use(session({
    store: mongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        expires: true,
        maxAge: 1 * 24 * 60 * 60 * 1000
    }
}))


// import and use various routes
app.use('/auth', checkAuth, authent);
app.use('/user', checkNotAuth, appusers);



// documentation routes
app.get("/documentation", (req, res)=>{
    res.render("index")
})

app.get('/logout', (req, res)=>{
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
})

app.get('/', checkAuth, (req, res)=>{
    res.redirect("/auth/login") 
})

// check user authentication and direct the homepage/login
function checkAuth(req, res, next){
    if('passport' in req.session){
        let usersession = req.session.passport.user;
        return res.redirect(`/user/${usersession.name}`)
    }
    return next();
}

// check user authentication and direct the homepage/login
function checkNotAuth(req, res, next){
    if('passport' in req.session){
        return next();
    }
    return res.redirect('/auth/login')
}

// all other routes
app.get("*", (req, res)=>{
    res.render("404_page", { title: 'User'})
})


app.listen(port, '0.0.0.0', ()=>{
    console.log(`Server is running on http://localhost:${port}\nfor the docs page visit http://localhost:${port}/documentation`)
})