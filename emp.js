const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Express middleware

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      port: 3306,
      password: 'password',
      database: 'employees_db'
    });
  
    connection.connect(function(err) {
      if (err) throw err
      console.log("Connected as Id" + connection.threadId)
      start()
    });

    function start() {
      inquirer
      .prompt ({
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices:
        [
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "EXIT"
        ]
      })
      .then(function ({ task }) {
        switch (task) {
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
            updateEmployeeRole();
            break;
  
          case "Add Employee":
            addEmployee();
            break;

          case "Update Employee Role":
            updateRole();
            break;
  
          case "Exit":
            connection.exit();
            break;
        }
      });
  }
  function viewAllDepartments() {
    const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.department_name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL DEPARTMENTS');
        console.log('\n');
        console.table(res);
        prompt();
    });
}
  function viewAllRoles() {
    const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ');
        console.log('\n');
        console.table(res);
        prompt();
    });
  }

  function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

      