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
            addRole();
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
    const query = `SELECT department.department_name AS department, role.title, employee.id, employee.first_name, employee.last_name
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
        start();
    });
}
  function viewAllRoles() {
    const query = `SELECT department.department_name AS department, role.title, employee.id, employee.first_name, employee.last_name
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
        start();
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
        start();
    });
}
function addDepartment() { 
  inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Add a department?"
      }
  ]).then(function(res) {
      var query = connection.query(
          "INSERT INTO department SET ? ",
          {
            name: res.name
          
          },
          function(err) {
              if (err) throw err
              console.table(res);
              startPrompt();
          })
        }) 
      }
function addRole() { 
  inquirer.prompt([
              {
                name: "Title",
                type: "input",
                message: "Enter role Title?"
              },
              {
                name: "Salary",
                type: "input",
                message: "Enter Salary?"
      
              } 
          ]).then(function(res) {
              connection.query(
                  "INSERT INTO role SET ?",
                  {
                    title: res.Title,
                    salary: res.Salary,
                  },
                  function(err) {
                      if (err) throw err
                      console.table(res);
                      startPrompt();
                  })
              })
        }

  function addEmployee() { 
          inquirer.prompt([
              {
                name: "first_name",
                type: "input",
                message: "Enter first name "
              },
              {
                name: "last_name",
                type: "input",
                message: "Enter last name "
              },
              {
                name: "role",
                type: "list",
                message: "What is their role? ",
                choices: selectRole()
              },
              {
                  name: "choice",
                  type: "rawlist",
                  message: "Enter the employee's manager's name?",
                  choices: selectManager()
              }
          ]).then(function (val) {
            var roleId = selectRole().indexOf(val.role) + 1
            var managerId = selectManager().indexOf(val.choice) + 1
            connection.query("INSERT INTO employee SET ?", 
            {
                first_name: val.firstName,
                last_name: val.lastName,
                manager_id: managerId,
                role_id: roleId
                
            }, function(err){
                if (err) throw err
                console.table(val)
                startPrompt()
            })
          })
      
      }
  function updateRole() {
        connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;"), 
        function(err, res) {
         if (err) throw err
         console.log(res)
        inquirer.prompt([
              {
                name: "last_name",
                type: "rawlist",
                choices: function() {
                  var lastName = [];
                  for (var i = 0; i < res.length; i++) {
                    lastName.push(res[i].last_name);
                  }
                  return lastName;
                },
                message: "Enter employee's last name? ",
              },
              {
                name: "role",
                type: "rawlist",
                message: "Enter employee's new title? ",
                choices: selectRole()
              },
          ]).then(function(val) {
            var roleId = selectRole().indexOf(val.role) + 1
            connection.query("UPDATE employee SET WHERE ?", 
            {
              last_name: val.lastName
               
            }, 
            {
              role_id: roleId
               
            }, 
            function(err){
                if (err) throw err
                console.table(val)
                startPrompt()
            }
          )
      })
    } 
  }
      