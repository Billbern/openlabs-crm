// importing the various models
const Feedback = require("../models/feedback");
const Student = require("../models/student");
const Company = require("../models/company");
const Resume = require("../models/resume");
const Users = require("../models/user");
const Roles = require("../models/role");
const Jobs = require("../models/jobs");
const Tags = require("../models/tags");

async function initializeDb(bcrypt){
    // check roles and users table
    await Jobs.find({});
    await Resume.find({});
    await Student.find({});
    await Company.find({});
    await Feedback.find({});
    const jobTags = await Tags.find({});
    const userRoles = await Roles.find({});
    const adminUser = await Users.find({});

    // create various roles if roles table is empty
    if(userRoles.length === 0){
        Roles.insertMany([
            {name: 'student'},
            {name: 'company'},
            {name: 'admin'},
        ]).then(() => {
            console.info("User roles created");
        }).catch(err =>{
            console.error(err)
        })
    }

    // create admin user if users table is empty
    if(adminUser.length === 0){
        bcrypt.hash('admin4321', 10, (err, hash)=>{
            if(err){
                console.log(err)
            }else{
                Roles.findOne({name: 'admin'}, (err, result)=>{
                    if(err){
                        console.error(err)
                    }else{
                        const newUser = new Users({username: "admin", password: hash, role: result.id})
                        newUser.save((errr)=>{
                            if(errr)console.error(errr);
                            return;
                        })
                    }
                })
                
            }
        })
    }

    // create tags if tags table is empty
    if(jobTags.length === 0){
        Tags.insertMany([
            {name: 'python'},
            {name: 'javascript'},
            {name: 'hardware administration'},
            {name: 'cybersecurity'},
            {name: 'network administration'},
            {name: 'mobile apps dev'},
            {name: 'desktop apps'},
            {name: 'data analyst'},
            {name: 'business analyst'},
            {name: 'graphic designer'},
            {name: 'software developer'},
            {name: 'adobe photoshop'},
            {name: 'adobe illustrator'},
        ]).then(() => {
            console.info("Tags inserted");
        }).catch(err => {
            console.error(err)
        })
    }


}

module.exports = initializeDb;