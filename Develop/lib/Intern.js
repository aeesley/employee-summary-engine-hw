// This will pull in the Employee class data and allow us to extend it below
var Employee = require('./Employee.js')
// This Intern class will extend the existing Employee class to it, and then add the Intern specific data
class Intern extends Employee {
    constructor(id, name, email, school) {
        super(id, name, email) // pulling this data from Employee class
        this.school = school
    }
    //We have to include these methods per the assignment instructions so that the technology will match back to the HTML and pass all of the tests provided.
    getSchool() {
        return this.school
    }
    getRole() {
        return "Intern"
    }

}
// Allowing the Intern data to be exported
module.exports = Intern