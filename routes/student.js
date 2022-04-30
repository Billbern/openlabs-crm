// import express modules
const express = require('express');
const route = express.Router();

// // handle student page request
route.get('/user', (req, res)=>{
    res.render('student', { title: 'User' })
})

// // handle chat page request
route.get('/chat/user', (req, res)=>{
    res.render('chat', { title: 'User' })
})



module.exports = route;