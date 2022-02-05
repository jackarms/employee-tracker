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

db.query(`SHOW ROWS`, (err, rows) => {
  console.log(rows);
});

// inquirer
//   .prompt([
//     {
//       name: "initial_options",
//       type: "list",
//       message: "What would you like to do?",
//       choices: [
//         "View all departments",
//         "View all employees",
//         "Add a department",
//         "Add a role",
//         "Add an employee",
//         "Update an employee role",
//       ],
//     },
//   ])
//   .then((answers) => {
//     console.log(answers);
//   });
