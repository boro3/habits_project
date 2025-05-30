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

Also there are required few environment variables they are:

PORT

USE_FILE_STORAGE (if value 'TRUE' it will use the on file storing repository with fs)

JWT_SECRET for basic login. At this moment only one hardcoded user exist name: testUser and pass '123'


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


## App usage
Login from the login form the user is hardcoded no with name 'testUser' and pass '123'

![Screenshot from 2025-05-30 14-28-32](https://github.com/user-attachments/assets/2a1e71d2-a5c8-4a3e-aa2a-3a7b8301ffd0)

After you log in youl see the main (and only page)

![Screenshot from 2025-05-30 14-30-17](https://github.com/user-attachments/assets/53f9ecdd-7cb2-4a13-adda-909dce135737)

To toggle habit as finished/unfinished for today please click on the switch. This switch only works for today's date. If change the date on the date input youl see the finished record for the habits on that date. When you are on different date from today you will not be able to toggle the habit.
The date input is used for historic data. By chaning the date on the input you can see what habits were or were not finished on that date.
To add new habit click on the add button. New Modal window will open with input fields for creating new habit.

![Screenshot from 2025-05-30 14-29-34](https://github.com/user-attachments/assets/e9e178d7-e676-4ad5-98c8-741fb8383fb7)

This form have basic input validation and it will require name and description for the habit.
If you want to see more details for any habit on the list just click the habit on the list. This would open another modal window with more information about the habit and also will allow you to edit that habbit if you want.
On this window we can also see the last date when this habit was market as finished and the longest streak on it.
This form also implements basic validation so you will not be able to edit the habit if any of the two fields are left empty.

![Screenshot from 2025-05-30 14-30-46](https://github.com/user-attachments/assets/2fb5a0e3-fa82-4341-8ac8-5be0a970e87a)

For deleting habit click on the X button this will delete the habit and remove it from the list.





