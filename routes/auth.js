// import express module
const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();

// pass form data to req body
router.use(express.urlencoded({ extended: false }));


// import models
const User = require('../models/user');
const Role = require('../models/role');


// handle login page request
router.get('/login', (req, res)=>{
    res.render('auth/login')
})

// handle signup page request
router.get('/register', (req, res)=>{
    res.render('auth/register')
})

// handle signup page request
router.get('/forgotten', (req, res)=>{
    res.render('auth/forgotten')
})

// handle login request
router.post('/login',  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/auth/login'})
)

// handle registration request
router.post('/register', (req, res)=>{

    if(req.body.usrname && req.body.password && req.body.role){
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err){
                console.log(err)
            }else{
                Role.findOne({name: req.body.role}, (err, result)=>{
                    if(err){
                        console.error(err)
                    }else{
                        const newUser = new User({username: req.body.usrname, password: hash, role: result.id})
                        newUser.save((errr)=>{
                            if(errr)console.error(errr);
                            return res.redirect('/auth/login');
                        })
                    }
                })
                
            }
        })
    }
    return;

})



module.exports = router;