const express = require('express');
const router = express.Router();
const passport = require('passport');

//Bring User models
let User = require('../models/user');

//Home route
router.get('/',function(req,res){
    res.render('loginPage')
});

router.post('/login',
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/error',
        failureFlash : true
    })
);

router.get('/error',function(req,res){
    res.render('errorPage');
});


router.get('/home',function(req,res){
    res.render('homePage');
});

module.exports = router;