const express = require('express');
const controller = require('../controllers/trainerControllers');

const router = express.Router();

router.get("/", controller.landing_page);

router.get("/trainingGoals", controller.training_goals);

router.get("/insertForm", controller.show_new_training_goal);

router.post('/insertForm', controller.post_training_goal);

router.get("/completedGoals", controller.find_completed_entries);

router.get("/incompleteGoals", controller.find_incomplete_entries);

router.get('/posts/:name', controller.show_trainers_goals);

router.get('/error', controller.testError500, controller.error500);

router.use(controller.error404);

router.use(controller.error500);

module.exports = router;