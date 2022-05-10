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


// try creating database connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err){
        console.error(err)
    }
})

mongoose.connection.on('open', async ()=>{
    console.info("Hurray database connected");

    // check roles and users table
    const userRoles = await Roles.find({});
    const adminUser = await Users.find({});

    // create various roles if roles table is empty
    if(userRoles.length === 0){
        Roles.create({name: 'student'}, (err, result)=>{
            if(result) return;
            console.error(err)
        });
        Roles.create({name: 'company'}, (err, result)=>{
            if(result) return;
            console.error(err)
        });Roles.create({name: 'admin'}, (err, result)=>{
            if(result) return;
            console.error(err)
        });
    }

    // create admin user if users table is empty
    if(adminUser.length === 0){
        bcrypt.hash('admin4321', 10, (err, hash)=>{
            if(err){
                console.log(err)
            }else{
                Roles.findOne({name: 'admin'}, (err, result)=>{
                    if(err){
                        console.error(err)
                    }else{
                        const newUser = new Users({username: "admin", password: hash, role: result.id})
                        newUser.save((errr)=>{
                            if(errr)console.error(errr);
                            return;
                        })
                    }
                })
                
            }
        })
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