const express = require('express');
const router = express.Router();

// pass form data to req body
router.use(express.urlencoded({ extended: false }));

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

router.post('/jobs', (req, res)=>{
    console.log('\n');
    console.log(req.body);
    console.log('\n');
    let usersession = req.session.passport.user;
    res.redirect(`/user/${usersession.name}`)
})

module.exports = router;