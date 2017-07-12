const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');    
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');
//Initialises app
const app = express();

//Establishing mongoose connection
mongoose.connect(config.database);
let db = mongoose.connection;

//Check mongoose connection
db.once('open',function(){
    console.log('Connected to mongodb')
});

//Check mongoose errors
db.on('error',function(err){
    console.log('err')
});

//Bring models
let users = require('./models/Users');

//Load template(pug)
app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

//passport config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Express-session Middleware
app.use(session({
    secret : 'It is a secret',
    resave : false,
    saveUninitialized : true
}));

//Home route
app.get('/',function(req,res){
    res.render('loginPage')
});

app.post('/login',function(req,res,next){
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect : '/',
        failureFlash : true
    })(req,res,next);
});

app.get('/login',function(req,res){
    res.render('homePage');
})

//Starts application in required port
app.listen(3030);