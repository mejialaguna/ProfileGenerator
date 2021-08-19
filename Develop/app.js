const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.


function createEmployee(employeeType) {
  inquirer.prompt([
    {
      message: "select new hire",
      type: "checkbox",
      name: "employeeType",
      choices: ["Manager", "Engineer", "Intern"],
    },
  ]);
  if (employeeType === "Manager") {
    return createManager();
  } else if (employeeType === "Engineer") {
    return createEngineer();
  } else if (employeeType=== "Intern") {
    return createIntern()
  }
}

function createManager() {
  inquirer
    .prompt([
      {
        message: "Whats is the name of the new manager",
        type: "input",
        name: "name",
      },
      {
        message: "manager Office number",
        type: "input",
        name: "officeNumber",
      },
      {
        message: " manager id number",
        type: "input",
        name: "idNumber",
      },
      {
        message: "whats your email",
        type: "input",
        name: "email",
      },
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee",
        default: false,
      },
    ])

    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.idNumber,
        answers.email,
        answers.officeNumber
      );
      employees.push(manager);
      if (answers.confirmEmployee) {
        return createManager(answers);
      } else {
        return employees;
      }
    });
}
function createEngineer() {
  inquirer
    .prompt([
      {
        message: "Whats is the name of the new Engineer",
        type: "input",
        name: "name",
      },
      {
        message: "Engineer Office number",
        type: "input",
        name: "officeNumber",
      },
      {
        message: "New Engineer id number",
        type: "input",
        name: "idNumber",
      },
      {
        message: "whats the new Engineer email",
        type: "input",
        name: "email",
      },
    ])
    .then((answers) => {
      const Engineer = new Engineer(
        answers.name,
        answers.idNumber,
        answers.email,
        answers.officeNumber
      );
      employees.push(Engineer);
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        message: "Whats is the name of the new Intern",
        type: "input",
        name: "name",
      },
      {
        message: "Intern Office number (if any)",
        type: "input",
        name: "officeNumber",
      },
      {
        message: "New Intern id number",
        type: "input",
        name: "idNumber",
      },
      {
        message: "whats the new Intern email",
        type: "input",
        name: "email",
      },
    ])
    .then((answers) => {
      const Intern = new Intern(
        answers.name,
        answers.idNumber,
        answers.email,
        answers.officeNumber
      );
      employees.push(Intern);
    });
}

function init() {
    inquirer.prompt(createEmployee)
    .then (answers => {
        writeToFile("", createEmployee(answers))
        console.log('created');
    } )
    .catch( err => {
      console.log(err);
    })
         
}

init()
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
