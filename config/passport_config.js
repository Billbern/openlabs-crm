const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');


function initialiseUser(passport){

    const authenticateUser = async (username, password, done)=>{

        try {
            const user = await User.findOne({'username': username}).populate('role')
            if (!user){
                return done(null, false, {message: "create an account"})
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare){
                return done(null, false, {message: 'wrong username or password'})
            }
            return done(null, user)
        } catch (err) {
            done(err);
        }
    }

    passport.use(new localStrategy({usernameField: 'usrname'}, authenticateUser) )
    passport.serializeUser((user, done) => done(null, { id: user.id, name: user.username, role: user.role.name }))
    passport.deserializeUser(async (id, done) => {
        return done(null, await User.findOne({'_id': id}, (err, idObj)=>{ if(idObj){ console.log(idObj); return idObj;}console.log(err); }))
    })
}

module.exports = initialiseUser;