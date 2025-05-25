# habits_project

## Intro 
Habits Tracker Application is consisted of two separate codebases, one for the front-end, and one for the back-end. Both codebases are built using javascript. The front-end is based on **React.js/ES6**, and the back-end uses **express with Node.js**. 

## Installation

The code lives in the habits_project repository, and to get it simply execute the following command

"git clone https://github.com/boro3/habits_project.git"


## Installing project dependencies

If you take a look at the project structure you'll see something like this:

-   api (this is where the code for REST API)
-   web (this is where the code for the React front-end app is placed)

To get your code running you'll need to do two things first: get Node.js dependencies.

Installing the dependencies should be a breeze, just place yourself in the project directory and execute the following commands

cd api
npm install

to install the node modules for the API, and

cd web
npm install

to install the node modules for the React frontend app.

## Running the code

To run the code you'll need to execute the following commands

cd api
npm start

once you got them up and running you should see output similar to this in your terminal window

To run the front-end use the following commands

cd web
npm start

## Access

After all the apps are running, the front end should be accessible on `http://localhost:3000/` and on `http://localhost:8000`. The backend is accessible on `http://localhost:8000/api/habits`.

On the initial commit time restricted work was uploaded so not all requirements were implemented.

1. The front end app is realy simple in design.
2. No TailwindCSS was used.
3. No FileHabitRepository for keeping data on file was implemented (only In memroy reppsitory was implemented).
