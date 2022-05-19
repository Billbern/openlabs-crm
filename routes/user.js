const express = require('express');
const router = express.Router();

// pass form data to req body
router.use(express.urlencoded({ extended: false }));

const Jobs = require('../models/jobs');
const Students = require('../models/student');

// handle dashboard requests from users
router.get('/:username', async (req, res)=>{
    let usersess = req.session.passport.user;
    let data = [];
    try {
        if (usersess.role === 'company'){
            data = await Jobs.find({user: usersess.id});
        }else if (usersess.role === 'student'){
            data = await Jobs.find({});
        }
    } catch (error) {
        
    }
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role, data: data});
})

// handle user chats
router.get('/chat/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard', {title: '', username: usersess.name, role: usersess.role});
})

// display all applicants of various jobs posted
router.get('/applicants/:username', async (req, res)=>{
    let usersess = req.session.passport.user;
    if (usersess.role === 'company'){
        const data = await Jobs.find({user: usersess.id}).populate({path: 'applicants'});
        res.render('dashboard', {title: '', username: usersess.name, role: usersess.role, applicants: data});
    }else{
        return res.redirect('/')
    }
})

// display profile page for user
router.get('/profile/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard_user_profile', {title: '', username: usersess.name, role: usersess.role});
})

// display settings page for user
router.get('/settings/:username', (req, res)=>{
    let usersess = req.session.passport.user;
    res.render('dashboard_settings', {title: '', username: usersess.name, role: usersess.role});
})

// display users applied jobs
router.get('/applications/:username', async (req, res)=>{
    let usersess = req.session.passport.user;
    if (usersess.role === 'student'){
        const pros_student = await Students.find({user : usersess.id});
        const data = await Jobs.find({applicants: [pros_student.id] })
        res.render('dashboard', {title: '', username: usersess.name, role: usersess.role, applied: data});
    }else{
        return res.redirect('/');
    }
})

//create job post if user is a company
router.post('/jobs', (req, res)=>{
    const job = req.body;
    let usersess = req.session.passport.user;
    if (usersess.role === 'company'){
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
    }else{
        return res.redirect('/')
    }
})

module.exports = router;