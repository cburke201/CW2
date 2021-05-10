# WebDev2coursework CW2

In order to install. This repository needs to be downloaded into an appropriate editor such as Visual Studio Code. 

It can be run using the command node index.js.

Use of .gitignore was used for deployment on heroku and the deployed website can be found at https://coursework2craigburke.herokuapp.com/

In the event of download, the .gitignore must be remove to allow access to node_modules folder which allows the rendering of the website.

Craig Burke - Student ID:2024071

The code contained in this repository forms the basis for my Coursework1 and Coursework2 submission

The brief was to create an activity planner.

The key features were to establish client-server communication - This was done using the express module within node.js.
Establish data persistence - This was done using Nedb and the creation of a database .db file to store data. This allowed data to be store when the application stopped running.
Integration of data into the programme. This was done by using Create, Read, Update, Delete(CRUD) functions which provide the basis for the logic of the application and manipulation of data.
The user of a Model-View-Controller Architecture. This applies to the way in which the code is structured and the creation of separate folder which contain the relevant code. i.e the model contained the logic code which reads the data from the database then presents it to the controller then to the view or takes user input from the view through the controller then saves the new data to the database.'

For the purpose of my coursework, I have implemented a function which allows the user to input a new training goal. However, the removal and editing of goals are hard coded. 

It takes the data from the database then presents this to the use in separate pages.

The first collects all the entries in a single point and displays them without a filter

![image](https://user-images.githubusercontent.com/72924354/111072626-44abae80-84d3-11eb-9199-46ec9a873608.png)

The second and third filters the database according to whether or not training goals have been completed

![image](https://user-images.githubusercontent.com/72924354/111072681-8dfbfe00-84d3-11eb-986a-a221394bd488.png)

![image](https://user-images.githubusercontent.com/72924354/111072688-97856600-84d3-11eb-93a4-1336b19b49da.png)


And the fourth page filters the database according to the name of the trainer carrying out the goal and displays the result

![image](https://user-images.githubusercontent.com/72924354/111072723-b4ba3480-84d3-11eb-9d16-a2987cbbd53f.png)
