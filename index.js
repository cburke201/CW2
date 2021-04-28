const express = require('express');
const path = require('path');
const nedb = require('nedb');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const router = require('./routes/trainerRoutes.js');

const db = new nedb();
const app = express();
app.engine('mustache', mustache()); 
app.set('view engine', 'mustache');
const public = path.join(__dirname, 'public');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(public));

app.use('/', router);

app.use('/trainingGoals', router);

app.use('/insertForm', router);

app.use('/completedGoals', router);

app.use('/incompleteGoals', router);

app.use('/error', router);

app.listen(3000, () => {
    console.log('Server started on port 3000, ctrl^c to quit');
})