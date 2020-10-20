// This Employee class has the general info all employees will have and creates a constructor to house all of this data. This class will then be extended to all the employee types.
class Employee {
    constructor(name, id, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    //We have to include these methods per the assignment instructions so that the technology will match back to the HTML and pass all of the tests provided.
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return "Employee"
    }
}
// Allowing the Employee data to be exported
module.exports = Employee