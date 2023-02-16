const Employee = require('./employee');

//extended from Employee class. Employee Parent, Intern Child
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
    }
    //pulls school from user inputs
    getSchool() {
        return this.school;
    }
    //modifies role to Intern
    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;