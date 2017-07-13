const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');    
const mongoose = require('mongoose');
const flash = require('connect-flash');
const config = require('./config/database');
const passport = require('passport');
const session = require('express-session');

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
let User = require('./models/user');

//Load template(pug)
app.set('view engine','pug');
app.set('views',path.join(__dirname, 'views'));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(session({ resave: true, 
                  saveUninitialized: true, 
                  secret: 'secret' }));

//passport config
require('./config/passport')(passport);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//app.use(app.router);

//Setting routes
let users = require('./routes/users');
app.use('/',users);


//Starts application in required port
app.listen(8000);