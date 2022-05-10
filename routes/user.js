const express = require('express');
const router = express.Router();


router.get('/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    if(usersession.role === 'student'){
        res.render('student', {title: '', username: usersession.name, role: usersession.role});
    }else if(usersession.role === 'company'){
        res.render('company', {title: '', username: usersession.name, role: usersession.role});
    }
})

router.get('/chat/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('student', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/applicants/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('company', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/profile/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('company', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/settings/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('company', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/applications/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('company', {title: '', username: usersession.name, role: usersession.role});
})

module.exports = router;