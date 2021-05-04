const express = require('express');
const path = require('path');
const nedb = require('nedb');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const router = require('./routes/trainerRoutes.js');
const auth = require('./auth/auth.js');
const session = require('express-session');
const passport = require('passport');

const db = new nedb();
const app = express();
app.engine('mustache', mustache()); 
app.set('view engine', 'mustache');

const public = path.join(__dirname, 'public');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'dont tell anyone', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(public));

auth.init();

app.use('/img/', express.static('./img/'));

app.use('/', router);

app.use('/trainingGoals', router);

app.use('/insertForm', router);

app.use('/completedGoals', router);

app.use('/incompleteGoals', router);

app.use('/error', router);


var port = process.env.PORT || 3000;

var server=app.listen, (port, function() {
    console.log('Server started on port 3000, ctrl^c to quit');
})