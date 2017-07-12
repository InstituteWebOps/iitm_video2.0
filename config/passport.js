const LocalStrategy = require('passport-local').Strategy;
const users = require('../models/Users');
const config = require('../config/database');

module.exports = function(passport){
    
    
    passport.use(new LocalStrategy(function(req,username,password,done){
        
         process.nextTick(function() {
            users.findOne({ 'user.username' :  username }, function(err, user) {
                if (err){ return done(err);}
                if (!user)
                    return done(null, false, req.flash('error', 'User does not exist.'));

                if (!user.verifyPassword(password))
                    return done(null, false, req.flash('error', 'Enter correct password'));
               else
                    return done(null, user);
            });
        });

         
    }))

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
   
}