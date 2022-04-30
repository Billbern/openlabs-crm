const express = require('express');
const route = express.Router();


route.get('/login', (req, res)=>{
    res.render('auth/login')
})

route.get('/register', (req, res)=>{
    res.render('auth/register')
})

route.post('/login', (req, res)=>{
    res.redirect('/company/user')
})

route.post('/register', (req, res)=>{
    res.sendStatus(200);
})



module.exports = route;