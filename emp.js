const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable  = require('console.table');

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
      console.log('connected as id ' + connection.threadId);
      choices()
    });

    function choices() {
      inquirer
      .prompt ({
        name: 'action',
        type: 'list',
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
            "Delete Employee",
            "EXIT" 
        ]        
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
           
         case "Delete Employee":
            deleteEmployee();
            break;
  
          case "Exit":
                exit();
            break;
        }
      })
  }
    viewAllDepartments = () => {
    const query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table('All Departments:', res); 
        choices();
    })
};
  function viewAllRoles () {
  connection.query (
    "SELECT role.id, role.title, role.salary, role.department_id, department.id, department.department_name FROM role LEFT JOIN department on role.department_id = department.id",
    function(err, res){
      if (err) throw err;
      console.table('All Roles:', res);
      choices();
  })
};

  function viewAllEmployees () {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id,FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
    function(err, res) {
      if (err) throw err;
      console.log(res.length + 'Employees');
      console.table('All Employees:', res); 
      choices();
  })
};

  function addDepartment() {
  inquirer
  .prompt ([
      {
        name: "name",
        type: "input",
        message: "Add a department?",
      }
       ]).then(function (answer) {
       connection.query(
          "INSERT INTO department SET ? ",
          {
            name: answer.name
          
          });
          query = "SELECT * FROM department";
          connection.query(query, function(err, res) {
              if (err) throw err;
              console.table(res);
              choices();
          })
        }) 
      }
function addRole() { 
  connection.query('SELECT * FROM department', function(err, res) {
    if (err) throw err;
    inquirer
    .prompt([
              {
                name: "Title",
                type: "input",
                message: "Enter role Title?"
              },
              {
                name: "Salary",
                type: "input",
                message: "Enter Salary?"
              },
              {
              name: 'Department',
              type: 'list',
              choices: function() {
                  const deptArry = [];
                  for (let i = 0; i < res.length; i++) {
                  deptArry.push(res[i].name);
                  }
              
                  return deptArry; 
                },
              }
              
            ]).then(function (answer) {
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
                    department_id: department_id
                  },
                  function(err) {
                      if (err) throw err;
                      console.table(res);
                      choices();
                  })
                })
        })

        function addEmployee() {
          connection.query('SELECT * FROM role', function (err, res) {
              if (err) throw err;
              inquirer
                  .prompt([
                      {
                          name: 'first_name',
                          type: 'input', 
                          message: "What is the employee's fist name? ",
                      },
                      {
                          name: 'last_name',
                          type: 'input', 
                          message: "What is the employee's last name? "
                      },
                      {
                          name: 'manager_id',
                          type: 'input', 
                          message: "What is the employee's manager's ID? "
                      },
                      {
                          name: 'role', 
                          type: 'list',
                          choices: function() {
                          var roleArray = [];
                          for (let i = 0; i < res.length; i++) {
                              roleArray.push(res[i].title);
                          }
                          return roleArray;
                          },
                          message: "What is this employee's role? "
                      }
                      ]).then(function (answer) {
                          let role_id;
                          for (let a = 0; a < res.length; a++) {
                              if (res[a].title == answer.role) {
                                  role_id = res[a].id;
                                  console.log(role_id)
                              }                  
                          }  
                          connection.query(
                          'INSERT INTO employee SET ?',
                          {
                              first_name: answer.first_name,
                              last_name: answer.last_name,
                              manager_id: answer.manager_id,
                              role_id: role_id,
                          },
                          function (err) {
                              if (err) throw err;
                              console.log('Your employee has been added!');
                              options();
            })
          })
      
      })
    };
  
  function updateRole() {

  };
  
  //  delete an employee
  function deleteEmployee() {
  
  };
  
  // exit the app
  function exit() {
      connection.exit();
  }
  };