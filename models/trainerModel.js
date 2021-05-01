const nedb = require('nedb');

class trainer {
    
    constructor(dbFilePath = 'training.db') {
        if(dbFilePath) {
            this.db = new nedb ({ filename: dbFilePath, autoload: true });
            console.log('DB connected to ' + dbFilePath); 
        } else{ 
            this.db = new nedb();
        }
    }

    /*init() {
        this.db.insert ({
            name: "bob",
            goal: "running",
            duration: "30 mins", 
            date: "08-12-2022",
            completed: 'true'
            
        });

        console.log('db entry bob inserted');

        this.db.insert ({
            name: "john",
            goal: "swimming", 
            duration: "30 mins", 
            date: "08-12-2020",
            completed: 'false'
        });
        console.log('db entry john inserted');
    }
    */

    addNewTrainingGoal(name, goal, duration, date, completed) {
        let trainingGoal = {
            name: name,
            goal: goal,
            duration: duration,
            date: new Date().toISOString().split('T')[0],
            completed: completed
        }
        console.log('Training goal added to page', trainingGoal);

        this.db.insert(trainingGoal, function(err, doc) {
            if (err) {
                console.log('Error adding goal', doc);
            } else {
                console.log('Goal added to database');
            }
        })
    }
    
    removeTrainingGoal(name) {
        let remGoal = {
            name: "john"
        }

        this.db.remove(remGoal, function(err, doc) {
            if(err) {
                console.log('error removing goal', doc);
            } else {
                console.log('goal removed from database');
            }
        })
    }

    deleteEntry(id){
        
        this.db.remove({_id: id}, {}, function(err, rem) {
            if(err) {
                console.log('error in deleteEntry', err);
            } else {
                console.log(rem, 'entries deleted');
            }
        })
    }
    
    /*updateGoal(){
    
        this.db.update({ name: 'bob' }, {   name: 'Fred',
                                            goal: "running",
                                            duration: "30 mins", 
                                            date: "08-12-2022",
                                            completed: 'true'}, {}, function (err, goalReplaced) {
            if(err) {
                console.log('error updating goal', goalReplaced);
            } else {
                console.log('goal updated in database');
            } 
        });
    }
    */

    getAllTrainingGoals() {
        return new Promise((resolve, reject) => {
            this.db.find({}, function(err, allGoals) {
                if(err) {
                    reject(err);
                } else {
                    resolve(allGoals);
                    console.log('getAllTrainingGoals() returns: ', allGoals);
                }
            })
        })
    }

    getCompletedGoals() {
        return new Promise((resolve, reject) => {
            this.db.find({ completed: 'true'}, function(err, compGoals) {
                if(err) {
                    reject(err);
                } else {
                    resolve(compGoals);
                    console.log('getCompletedGoals() returns: ', compGoals);
                }
            })
        })
    }

    getIncompleteGoals() {
        return new Promise((resolve, reject) => {
            this.db.find({ completed: 'false'}, function(err, incompGoals) {
                if(err) {
                    reject(err);
                } else {
                    resolve(incompGoals);
                    console.log('getIncompleteGoals() returns: ', incompGoals);
                }
            })
        })
    }

    getPostsByTrainer(name){
        return new Promise ((resolve, reject) => {
            this.db.find({ 'name': name}, function(err, entries) {
                if(err) {
                    reject(err);
                }else {
                    resolve(entries);
                    console.log('function getPostsByTrainer() returns: ', entries);
                }
            })
        })
    }
}


    

module.exports = trainer;