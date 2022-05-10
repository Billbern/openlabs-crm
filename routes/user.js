const express = require('express');
const router = express.Router();

// pass form data to req body
router.use(express.urlencoded({ extended: false }));

const Jobs = require('../models/jobs');

router.get('/:username', async (req, res)=>{
    let usersess = req.session.passport.user;
    let data = [];
    try {
        if (usersess.role === 'company'){
            data = await Jobs.find({user: usersess.id})
        }
    } catch (error) {
        
    }
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role, data: data});
})

router.get('/chat/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role});
})

router.get('/applicants/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role});
})

router.get('/profile/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role});
})

router.get('/settings/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role});
})

router.get('/applications/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role});
})

router.post('/jobs', (req, res)=>{
    const job = req.body;
    let usersess = req.session.passport.user;
    if (job.title && job.department && job.region && job.city && job.tags){
        let data = {title: job.title, department: job.department, region: job.region, city: job.city, user: usersess.id, content: job.content}
        if(job.remote){
            data.jobtype = 'remote'
        }
        Jobs.create(data).then(() => {
            return res.redirect(`/user/${usersess.name}`);
        }).catch(err => {
            console.error(err);
        })
    }
    return res.redirect(`/user/${usersess.name}`);
})

module.exports = router;