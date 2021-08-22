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
  inquirer.prompt([    
    {
      message: "what will be the Employee Role",
      type: "list",
      name: "role",
      choices: ["Manager", "Engineer", "intern"]
    }
  ])
  .then( data => { 
    console.log(data);
    if (data.role === "Manager") {
      manager();
    } else if (data.role === "Engineer") {
      engineer();
    } else  {
      intern()
    }
  })
}
function manager() {
  inquirer
    .prompt([  
      {
        message: "Whats is the name of the new Employee",
        type: "input",
        name: "name",
      },
      {
        message: "Employee ID Number",
        type: "input",
        name: "id",
      },
      {
        message: "whats the Employee email",
        type: "input",
        name: "email",
      },    
      {
        message: "manager Office number",
        type: "input",
        name: "officeNumber",
      },    
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee" 
      }
    ])

    .then((data) => {
      console.log(data)
      const manager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      employees.push(manager);

      if(data.confirmEmployee === true) {
        createEmployee();      
    } else{
        createMember()
    }
  });
}
function engineer() {
  inquirer
    .prompt([    
      {
        message: "Whats is the name of the new Employee",
        type: "input",
        name: "name",
      },
      {
        message: "Employee ID Number",
        type: "input",
        name: "id",
      },
      {
        message: "whats the Employee email",
        type: "input",
        name: "email",
      }, 
      {
        message: "Github username",
        type: "input",
        name: "gitHub",
      },
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee",
      }
    ])
    .then((data) => {
      console.log(data)
      const engineer = new Engineer(
        data.name,
        data.id,
        data.email,
        data.gitHub
      );
      employees.push(engineer);

      if(data.confirmEmployee === true){
        createEmployee()
      } else {
        createMember()
      }
    });
}
function intern() {
  inquirer
    .prompt([  
      {
        message: "Whats is the name of the new Employee",
        type: "input",
        name: "name",
      },
      {
        message: "Employee ID Number",
        type: "input",
        name: "id",
      },
      {
        message: "whats the Employee email",
        type: "input",
        name: "email",
      },    
      {
        message: "Where did the Intern went to school",
        type: "input",
        name: "school"
      },
      {
        message: "would you like to add another Employee",
        type: "confirm",
        name: "confirmEmployee"
      }
    ])
    .then((data) => {
      console.log(data)
      const intern = new Intern(
        data.name,
        data.id,
        data.email,
        data.school      
      );
      employees.push(intern);

      if(data.confirmEmployee === true){
        createEmployee()
      } else {
        createMember()
      }
    });
}
function createMember() {
  fs.existsSync(OUTPUT_DIR) || fs.mkdirSync(OUTPUT_DIR)
  
  fs.writeFileSync(outputPath, render(employees), "utf-8");
  
  console.log("created")
}

createEmployee()

