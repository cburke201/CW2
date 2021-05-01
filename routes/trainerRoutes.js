const express = require('express');
const controller = require('../controllers/trainerControllers');
const auth = require('../auth/auth');
const router = express.Router();
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.get("/", controller.landing_page);

router.get("/trainingGoals", controller.training_goals);

router.get("/insertForm", ensureLoggedIn('/login'), controller.show_new_training_goal);

router.post('/insertForm', ensureLoggedIn('/login'), controller.post_training_goal);

router.get("/completedGoals", controller.find_completed_entries);

router.get("/incompleteGoals", controller.find_incomplete_entries);

router.get('/posts/:name', controller.show_trainers_goals);

router.get('/error', controller.testError500, controller.error500);

router.get('/delete/:id', controller.delete_entry);

router.get('/login', controller.show_login_page);

router.post('/login', auth.authorize('/login'), controller.post_login);

router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get('/logout', controller.logout);

router.use(controller.error404);

router.use(controller.error500);

module.exports = router;