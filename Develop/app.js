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

// extra question only asked to intern
const addAnotherQuestions = [
    {
        name: 'addAnother',
        type: 'confirm',
        message: 'Would you like to add another?'
    }
]

// function that pushes data to HTML once the user selects that they do not want to add any more users
function populateHTML() {
    var rawHtml = render(teamMembers)
    fs.writeFile(outputPath, rawHtml, function(err) {
        console.log(err)
    })

}

// Function that starts the whole questions loop back over if they select that they want to add another
function addAnother() {
    inquirer.prompt(addAnotherQuestions).then(function(anotherData) {
        console.log(anotherData);

        if(anotherData.addAnother === true) {
            startQuestions();
        } else {
            populateHTML()
        }

    })

}
// function to save Manager data and push Manager data to teamMembers array
function createNewManager (data, managerData) {
    var myNewManager = new Manager(data.id, data.name, data.email, managerData.officeNumber);
    teamMembers.push(myNewManager);
    console.log('team memberssss', teamMembers);
    // prompts add another question function to see whether they want to add another or stop
    addAnother();
};

// function to save engineer data and push Engineer data to teamMembers array
function createNewEngineer (data, engineerData) {
    var myNewEngineer = new Engineer(data.id, data.name, data.email, engineerData.github);
    teamMembers.push(myNewEngineer);
    console.log('team memberssss',teamMembers);
    // prompts add another question function to see whether they want to add another or stop
    addAnother();
};

// function to save intern data and push Intern data to teamMembers array
function createNewIntern (data, internData) {
    var myNewIntern = new Intern(data.id, data.name, data.email, internData.school);
    teamMembers.push(myNewIntern);
    console.log('team memberssss', teamMembers);
    // prompts add another question function to see whether they want to add another or stop
    addAnother();
 
};


// function that asks all the base level questions, and then asks the additional question based on their role selection
function startQuestions () {

    inquirer.prompt(mainQuestions).then(function(data) {
        console.log(data);
        // asks manager specific question and then calls the function to generate new manager and push to array
        if (data.role === "Manager") {
            inquirer.prompt(managerQuestions).then(function(managerData){
                console.log(managerData);
                createNewManager(data, managerData);

            });
        // asks engineer specific question and then calls the function to generate new engineer and push to array
        } else if (data.role === "Engineer") {
            inquirer.prompt(engineerQuestions)
            .then(function(engineerData){
            console.log(engineerData);


            createNewEngineer(data, engineerData);
            }); 

        // asks intern specific question and then calls the function to generate new intern and push to array
        } else if (data.role === "Intern") {
            inquirer.prompt(internQuestions)
            .then(function(internData){
            console.log(internData);
            createNewIntern(data, internData);
            });
    }

})
}



// calls the function that starts the whole process
startQuestions();
