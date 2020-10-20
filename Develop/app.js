const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamMembers = [] // Creating an array where we will save all team members that were created

// array holding main questions (base questions all employees must answer)
const mainQuestions = [
    {
        name: 'id',
        type: 'input',
        message: 'What is your employee ID?'
    },
    {
        name: 'name',
        type: 'input',
        message: 'What is your name?'
    },
    {
        name: 'email',
        type: 'input',
        message: 'What is your email address?'
    },
    {
        name: 'role',
        type: 'list',
        message: 'Please select your current role below',
        choices: ["Manager", "Engineer", "Intern"]
    }
]
// extra question only asked to manager
const managerQuestions = [
    {
        name: 'officeNumber',
        type: 'input',
        message: 'What is your office phone number?'
    }
]
// extra questions only asked to engineers
const engineerQuestions = [
    {
        name: 'github',
        type: 'input',
        message: 'What is your Github username?'
    }
]
// extra question only asked to intern
const internQuestions = [
    {
        name: 'school',
        type: 'input',
        message: 'What school do you attend?'
    }
]
// function to save Manager data and push Manager data to teamMembers array
function createNewManager (data, managerData) {
    var myNewManager = new Manager(data.id, data.name, data.email, managerData.officeNumber);
    teamMembers.push(myNewManager);
    console.log(teamMembers);
};

// function to save engineer data and push Engineer data to teamMembers array
function createNewEngineer (data, engineerData) {
    var myNewEngineer = new Engineer(data.id, data.name, data.email, engineerData.github);
    teamMembers.push(myNewEngineer);
    console.log(teamMembers);
};

// function to save intern data and push Intern data to teamMembers array
function createNewIntern (data, internData) {
    var myNewIntern = new Intern(data.id, data.name, data.email, internData.school);
    teamMembers.push(myNewIntern);
    console.log(teamMembers);
};

// function that asks all the base level questions, and then asks the additional question based on their role selection
function startQuestions () {

    inquirer.prompt(mainQuestions)
    .then(function(data) {
        console.log(data);

        if (data.role === "Manager") {
            inquirer.prompt(managerQuestions)
            .then(function(managerData){
            console.log(managerData);
            createNewManager();
            });
        } else if (data.role === "Engineer") {
            inquirer.prompt(engineerQuestions)
            .then(function(engineerData){
            console.log(engineerData);
            createNewEngineer();
            }); 
        } else if (data.role === "Intern") {
            inquirer.prompt(internQuestions)
            .then(function(internData){
            console.log(internData);
            createNewIntern();
            });
    }
});
}

startQuestions();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
