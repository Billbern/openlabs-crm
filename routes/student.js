const express = require('express');
const route = express.Router();


route.get('/user', (req, res)=>{
    res.render('student', { title: 'User' })
})

route.get('/chat/user', (req, res)=>{
    res.render('chat', { title: 'User' })
})



module.exports = route;