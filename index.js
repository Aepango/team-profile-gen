const fs = require('fs');
const inquirer = require('inquirer');
//HTMl creation
const {generateHTML} = require('./src/profileGen')
//Software teams profiles
const Manager = require("./lib/manager")
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
//array to hold inputs
const SoftwareTeamArray = [];
//function to select prompts for manager
const createManager = () => {

    inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Please fill out the Managers name:',
        },

        {
            type: 'input',
            name: 'id',
            message: 'What is the Managers employee number?',
        },

        {
            type: 'input',
            name: 'email',
            message: 'Provide Managers Email:'
        },

        {
            type: 'input',
            name: 'officeNum',
            message: 'What is the Managers office Number?'
        },
        ])
        .then(managersInput => {
            const {name, id, email, officeNum} = managersInput;
            const manager = new Manager(name, id, email, officeNum);
            SoftwareTeamArray.push(manager);
            shouldAdd();
        })

    }

//Function to add new employees
const shouldAdd = () => {
        inquirer
        .prompt([
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Would you like to add another employee?' 
    }])
    .then(data => {
        if(data.confirm){
            createEmployee()
        }
        else{
        const html = generateHTML(SoftwareTeamArray)
        fs.writeFile('dist/test.html', html, function(err){
            if(err) console.log(err)
        })
        }
    })

}
//function with prompts to select employees
const createEmployee = () => {
        inquirer
        .prompt([
        {
        type: 'list',
        name: 'role',
        message: 'What is the postition you wish to fill out?',
        choices: ['Engineer', 'Intern'],
    },

    {
        type: 'input',
        name: 'name',
        message: "Fill out the Employee's name:",
    },

    {
        type: 'input',
        name: 'id',
        message: 'Please provide employees ID:',
    },

    {
        type: 'input',
        name: 'email',
        message: 'Provide the employees email:',
    },

    {
        type: 'input',
        name: 'github',
        message: "What is the employee's github username?",
        when: (input) => input.role === "Engineer"
    },

    {
        type: 'input',
        name: 'school',
        message: "What school does this intern attend?",
        when: (input) => input.role === "Intern"
    }
])
.then(employeeData => {
    let {name, id, email, role, github, school} = employeeData;
    let employee;
    if (role === "Engineer") {
        employee = new Engineer(name, id, email, github);
    }
    else {
        employee = new Intern(name, id, email, school);
    }
    SoftwareTeamArray.push(employee);
    shouldAdd();

})
}
createManager();