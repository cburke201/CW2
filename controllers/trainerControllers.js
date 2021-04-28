const express = require('express');
const path = require('path');

const trainerDAO = require('../models/trainerModel');

const app = express();
const db = new trainerDAO();

const img = path.join(__dirname, '../img');
app.use(express.static(img));

// db.db.loadDatabase();

db.init();

exports.landing_page = function(req, res) {
    res.render('homepage', {
        'title': 'Homepage'
    });

}

exports.training_goals = function(req, res) {
    db.getAllTrainingGoals().then((allGoals) => {
        res.render('trainingGoals', {
            'title': 'Training Goals',
            'trainingGoals': allGoals
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })

    db.removeTrainingGoal(req.body.name);

    db.updateGoal();
}

exports.show_new_training_goal = function(req, res) {
    res.render('insertForm', {
        'title': 'Insert Training goal'
    });
}

exports.post_training_goal = function(req, res) {

    if(!req.body.name) {
        response.status(404).send("Training Goals must have an assigned user");
        return;
    }

    db.addNewTrainingGoal(req.body.name, req.body.goal, req.body.duration, req.body.date, req.body.completed);
    res.redirect('/trainingGoals');
}

exports.find_completed_entries = function(req, res) {
    // find all entries for tasks which have been completed
    db.getCompletedGoals().then((compGoals) => {
        res.render('completedGoals', {
            'title': 'Completed Goals',
            'completedGoals': compGoals
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}
exports.find_incomplete_entries = function(req, res) {
    // find all entries for tasks which are still incomplete
    db.getIncompleteGoals().then((incompGoals) => {
        res.render('incompleteGoals', {
            'title': 'incomplete Goals',
            'incompleteGoals': incompGoals
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })
}

exports.show_trainers_goals = function(req, res) {
    console.log('filtering name', req.params.name);

    let trainer = req.params.name;
    db.getPostsByTrainer(trainer).then((trainGoals) => {
        res.render('PostByTrainer', {
            'title': 'Posts By Trainer',
            'PostByTrainer': trainGoals
        });
    }).catch((err) => {
        console.log('error handling name posts', err);
    })
}

exports.testError500 = function(req, res) {
    if(render) {
    res.render('error', {
        'title': 'Test Error 500'
    });
    } else {
    throw(error500);
    }
}

exports.error404 = function(req, res) {
    res.status(404);
    res.type('image/jpeg');
    res.sendFile(path.join(img, 'Error404.jpg'));
}

exports.error500 = function(err, req, res, next) {
    res.status(500);
    res.type('image/jpeg');
    res.sendFile(path.join(img, 'Error500.jpg'));
}