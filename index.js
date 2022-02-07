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
    } else if (answers.initial_options == "Add a department") {
      inquirer
        .prompt([
          {
            name: "add_department",
            type: "input",
            message:
              "What is the name of the department you would like to add?",
          },
        ])
        .then((answers) => {
          addADepartment(answers.add_department);
        });
    } else if (answers.initial_options == "Add a role") {
      inquirer
        .prompt([
          {
            name: "add_role",
            type: "input",
            message: "What is the name of the role you would like to add?",
          },
          {
            name: "role_salary",
            type: "number",
            message: "What will the salary be for this role?",
          },
          {
            name: "role_id",
            type: "number",
            message:
              "What is the id number of the department to which this role belongs?",
          },
        ])
        .then((answers) => {
          addARole(answers.add_role, answers.role_salary, answers.role_id);
        });
    } else if (answers.initial_options == "Add an employee") {
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message:
              "What is the first name of the employee you would like to add?",
          },
          {
            name: "last_name",
            type: "input",
            message:
              "What is the last name of the employee you would like to add?",
          },
          {
            name: "role_id",
            type: "number",
            message:
              "What is the ID number of the role which the employee will perform?",
          },
          {
            name: "manager_id",
            type: "number",
            message:
              "What is the ID number of the manager whom your employee will report to?",
          },
        ])
        .then((answers) => {
          addEmployee(
            answers.first_name,
            answers.last_name,
            answers.role_id,
            answers.manager_id
          );
        });
    } else if (answers.initial_options == "Update an employee role") {
      inquirer
        .prompt([
          {
            name: "employee_id",
            type: "number",
            message:
              "What is the ID number of the employee whose role you would like to update?",
          },
          {
            name: "role_id",
            type: "number",
            message:
              "What is the ID number of the role you would like the employee to change to?",
          },
        ])
        .then((answers) => {
          updateRole(answers.role_id, answers.employee_id);
        });
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
  LEFT JOIN roles ON employee.role_id = roles.id;`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      console.table(rows);
    }
  );
};

const addADepartment = function (choice) {
  const sql = `INSERT INTO department (department_name)
  VALUES (?)`;
  const params = [choice];
  db.query(sql, params, (err, rows) => {
    console.table(rows);
  });
};

const addARole = function (title, salary, department_id) {
  const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`;
  const params = [title, salary, department_id];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
  });
};

const addEmployee = function (first_name, last_name, role_id, manager_id) {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
  const params = [first_name, last_name, role_id, manager_id];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
  });
};

const updateRole = function (role_id, employee_id) {
  const sql = `UPDATE employee
  SET role_id = (?)
  WHERE id = (?)`;
  const params = [role_id, employee_id];
  db.query(sql, params, (err, rows) => {
    if (err) {
      console.log(err);
    }
    console.table(rows);
  });
};
