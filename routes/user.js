const express = require('express');
const router = express.Router();


router.get('/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/chat/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/applicants/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/profile/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/settings/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersession.name, role: usersession.role});
})

router.get('/applications/:username', (req, res)=>{
    let usersession = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersession.name, role: usersession.role});
})

module.exports = router;