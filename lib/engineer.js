const Employee = require('./employee');
//extended from Employee class. Employee Parent, Engineer Child
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email);
        this.github = github;
    }
    //pulls github from user inputs
    getGithub() {
        return this.github;
    }
    //modifies role to Engineer
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;
