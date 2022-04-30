// import express module
const express = require('express');
const route = express.Router();

// handle login page request
route.get('/login', (req, res)=>{
    res.render('auth/login')
})

// handle signup page request
route.get('/register', (req, res)=>{
    res.render('auth/register')
})

// handle login request
route.post('/login', (req, res)=>{
    res.redirect('/company/user')
})

// handle registration request
route.post('/register', (req, res)=>{
    res.sendStatus(200);
})



module.exports = route;