const express = require('express');
const route = express.Router();


route.get('/user', (req, res)=>{
    res.render('company', { title: 'User' })
})

route.get('/applications/user', (req, res)=>{
    res.render('application', { title: 'User' })
})


module.exports = route;