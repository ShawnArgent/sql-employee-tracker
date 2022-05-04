const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "password",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  userPrompt();
});

function userPrompt() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Delete Employee",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all Departments":
          viewAllDepartments();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "View all Employees":
          viewAllEmployees();
          break;

        case "Add Deparment":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "Exit":
          exit();
          break;
      }
    });
}
function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    userPrompt();
  });
}
function viewAllRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    userPrompt();
  });
}
function viewAllEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    userPrompt();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Add a department?",
      },
    ])
    .then(function (answer) {
      connection.query("INSERT INTO department SET ? ", {
        name: answer.name,
      });
      query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        userPrompt();
      });
    });
}
function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "Title",
          type: "input",
          message: "Enter role Title?",
        },
        {
          name: "Salary",
          type: "input",
          message: "Enter Salary?",
        },
        {
          name: "Department",
          type: "list",
          userPrompt: function () {
            const deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }

            return deptArry;
          },
        },
      ])
      .then(function (answer) {
        let department_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == answer.Department) {
            department_id = res[a].id;
          }
        }

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.Title,
            salary: answer.Salary,
            department_id: department_id,
          },
          function (err) {
            if (err) throw err;
            console.table(res);
            userPrompt();
          }
        );
      });
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter employee's fist name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter employee's last name? ",
        },
        {
          name: "manager_id",
          type: "input",
          message: "Enter employee's manager's ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "Enter employee's role? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Employee added.");
            options();
          }
        );
      });
  });
}

// exit the app
function exit() {
  connection.exit();
}
