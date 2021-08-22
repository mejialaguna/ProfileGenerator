const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const Employee = require("./lib/Employee.js")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

function createEmployee() {
  inquirer
    .prompt([
      {
        message: "what will be the Employee Role",
        type: "list",
        name: "role",
        choices: ["Manager", "Engineer", "intern"],
      },
      {
        message: "Whats is the name of the new Employee",
        type: "input",
        name: "name",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(
              "please having a name its very important , please add one"
            );
            return false;
          }
        },
      },
      {
        message: "Employee ID Number",
        type: "input",
        name: "id",
        validate: (nameInput) => {
          // to make sure its a Number and no letters
          if (isNaN(nameInput)) {
            console.log("    NO LETTERS , please provide the correct number");
            return false;
          } else if (!nameInput) {
            console.log("please provide a EMPLOYEE ID NUMBER");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        message: "whats the Employee email",
        type: "input",
        name: "email",
        validate: (email) => {
          if (!email) {
            console.log("please add a valid email");
            return false;
          } else {
            // Regex mail check (return true if valid mail)
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(
              email
            );
          }
        },
      }
    ])
    .then((data) => {
      console.log(data);
      if (data.role === "Manager") {
        manager(data);
      } else if (data.role === "Engineer") {
        engineer(data);
      } else {
        intern(data);
      }
    });
}
function manager(previousAnswer) {
  inquirer
    .prompt([
      {
        message: "What is the manager Office number?",
        type: "input",
        name: "officeNumber",
        validate: (nameInput) => {
          if (isNaN(nameInput)) {
            console.log(
              "   office phone does not have letters!!!!!   please enter the proper numbers"
            );
            return false;
          } else if (!nameInput) {
            console.log("please add the OFFICE NUMBER");
            return false;
          } else {
            return true;
          }
        },
      },
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee",
      },
    ])

    .then((data) => {
      console.log(data);
      const manager = new Manager(
        previousAnswer.name,
        previousAnswer.id,
        previousAnswer.email,
        data.officeNumber
      );
      employees.push(manager);

      if (data.confirmEmployee === true) {
        createEmployee();
      } else {
        createMember();
      }
    });
}
function engineer(previousAnswer) {
  inquirer
    .prompt([
      {
        message: "Github username",
        type: "input",
        name: "gitHub",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please add you GITHUB user name");
            return false;
          }
        },
      },
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee",
      },
    ])
    .then((data) => {
      console.log(data);
      const engineer = new Engineer(
        previousAnswer.name,
        previousAnswer.id,
        previousAnswer.email,
        data.gitHub
      );
      employees.push(engineer);

      if (data.confirmEmployee === true) {
        createEmployee();
      } else {
        createMember();
      }
    });
}
function intern(previousAnswer) {
  inquirer
    .prompt([
      {
        message: "Where did the Intern went to school",
        type: "input",
        name: "school",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("please provide your INTERN  school");
            return false;
          }
        },
      },
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee",
      },
    ])
    .then((data) => {
      console.log(data);
      const intern = new Intern(previousAnswer.name, previousAnswer.id, previousAnswer.email, data.school);
      employees.push(intern);

      if (data.confirmEmployee === true) {
        createEmployee();
      } else {
        createMember();
      }
    });
}


function createMember() {
  fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR)

  fs.writeFileSync(outputPath, render(employees), "utf-8")
  console.log("created");
  // .catch( err => {
  //   console.log(err);
  // })
}

createEmployee();
