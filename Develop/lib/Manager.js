// This will pull in the Employee class data and allow us to extend it below
var Employee = require('./Employee.js')
// This Manager class will extend the existing Employee class to it, and then add the Manager specific data
class Manager extends Employee {
    constructor(id, name, email, officeNumber) {
        super(id, name, email) // pulling this data from Employee class
        this.officeNumber = officeNumber
    }
    //We have to include these methods per the assignment instructions so that the technology will match back to the HTML and pass all of the tests provided.
    getOfficeNumber() {
        return this.officeNumber
    }
    getRole() {
        return "Manager"
    }

}
// Allowing the Manager data to be exported
module.exports = Manager