const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "L1?oveless10",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

inquirer
  .prompt([
    {
      name: "initial_options",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ])
  .then((answers) => {
    if (answers.initial_options == "View all departments") {
      viewAllDepartments();
    } else if (answers.initial_options == "View all roles") {
      viewAllRoles();
    } else if (answers.initial_options == "View all employees") {
      viewAllEmployees();
    }
  });

const viewAllDepartments = function () {
  db.query(`SELECT department_name FROM department;`, (err, rows) => {
    console.table(rows);
  });
};

const viewAllRoles = function () {
  db.query(
    `SELECT roles.*, department.department_name
  FROM roles
  LEFT JOIN department ON roles.department_id = department.id`,
    (err, rows) => {
      console.table(rows);
    }
  );
};

const viewAllEmployees = function () {
  db.query(
    `SELECT employee.*, roles.title
  FROM employee
  LEFT JOIN roles ON employee.role_id = roles.id`,
    (err, rows) => {
      console.table(rows);
    }
  );
};
