// This will pull in the Employee class data and allow us to extend it below
var Employee = require('./Employee.js')
// This Engineer class will extend the existing Employee class to it, and then add the Engineer specific data
class Engineer extends Employee {
    constructor(id, name, email, github) {
        super(id, name, email) // pulling this data from Employee class
        this.github = github
    }
    //We have to include these methods per the assignment instructions so that the technology will match back to the HTML and pass all of the tests provided.
    getGithub() {
        return this.github
    }
    getRole() {
        return "Engineer"
    }

}
// Allowing the Engineer data to be exported
module.exports = Engineer