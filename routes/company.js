// import express modules
const express = require('express');
const route = express.Router();

// handle company page request
route.get('/user', (req, res)=>{
    res.render('company', { title: 'User' })
})

// handle job applications page request
route.get('/applications/user', (req, res)=>{
    res.render('application', { title: 'User' })
})


module.exports = route;