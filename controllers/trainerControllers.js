const express = require('express');
const path = require('path');

const trainerDAO = require('../models/trainerModel');
const userDAO = require('../models/userModel');

const app = express();
const db = new trainerDAO();

const img = path.join(__dirname, '../img');
app.use(express.static(img));

// db.db.loadDatabase();

// db.init();

exports.landing_page = function(req, res) {
    res.render('homepage', {
        'title': 'Homepage'
    });

}

exports.training_goals = function(req, res) {
    db.getAllTrainingGoals().then((allGoals) => {
        res.render('trainingGoals', {
            'title': 'Training Goals',
            'trainingGoals': allGoals,
            "user": req.user
        });
        console.log('promise resolved');
    }).catch((err) => {
        console.log('promise rejected', err);
    })

    // db.removeTrainingGoal(req.body.name);

    // db.updateGoal();
}

exports.show_new_training_goal = function(req, res) {
    res.render('insertForm', {
        'title': 'Insert Training goal',
        'user': req.user.user
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

exports.delete_entry = function(req, res){
    db.deleteEntry(req.params.id);    
    res.redirect('/trainingGoals');
}
 
exports.show_update_entry = function(req, res) {
    res.render("update", {
        'title': 'Update Entry',
        'user': req.user.user
    });
}

exports.post_update_entry = function(req, res) {
    console.log('id in update_entry', req.params.id);
    db.updateEntry(req.params.id, req.body.name, req.body.goal, req.body.duration, req.body.date, req.body.completed);
    res.redirect('/trainingGoals');
}
exports.find_completed_entries = function(req, res) {
    // find all entries for tasks which have been completed
    db.getCompletedGoals().then((compGoals) => {
        res.render('completedGoals', {
            'title': 'Completed Goals',
            'completedGoals': compGoals,
            "user": req.user
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
            'incompleteGoals': incompGoals,
            "user": req.user
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

exports.show_login_page = function(req, res) {
    res.render('login', {
        'title': 'Training Goals: Login'
    });
}

exports.post_login = function(req, res) {
    console.log('serializeUser wrote', req.session.passport.user);
    res.redirect('/trainingGoals');
}

exports.show_register_page = function(req, res) {
    res.render("register");
}

exports.post_new_user = function(req, res) {
    const user = req.body.username;
    const password = req.body.pass;
    //console.log("register user", user, "password", password);
    if(!user || !password ) {
        res.send(401, 'no user or no password');
        return;
    }
    userDAO.lookup(user, function(err, u) {
        if(u) {
            res.send(401, "User exists: ", user);
            return;
        }
        userDAO.create(user, password);
        res.redirect('login');
    })
}

exports.logout = function (req, res) {
    req.logout();
    res.redirect("login");
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