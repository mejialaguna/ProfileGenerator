// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// need to get some info from Employee file
const Employee = require("./Employee");

// The extends keyword is used in class declarations or class expressions to create
//  a class that is a child of another class , his class should inherit from Employee.

class Engineer extends Employee {
  constructor(name, id, email, github) {
    // When we call super(name), it passes the name argument to the
    // constructor() of the Character class, where name and other
    // properties like health are officially defined. Afterwards,
    // the Player class will add any additional properties like this.inventory to the object.
    super(name, id, email);
    this.github = github;
  }
  getRole() {
    return "Engineer";
  }
  getGithub() {
    return this.gitHub;
  }
}

module.exports = Engineer;
