INSERT INTO department (name)
VALUES ("Human Resources"),
        ("Accounting"),
        ("Marketing"),
        ("Sales");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id) 
VALUES  ("HR Director", 100000),
        ("Benefits Administrator", 85000),
        ("Chief Financial Officer", 250000),
        ("Accountant", 95000, 2),
        ("Marketing Director", 100000),
        ("Sales Manager", 125000),
        ("Sales Representative", 85000);

        SELECT * FROM Role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jacob", "Samuel"),
        ("Amber", "Thompson"),
        ("Robert", "Chase"),
        ("Patrick", "O'Brien"),
        ("Kerrie", "Benz"),
        ("Luke", "Anderson"),
        ("Toby", "Arnold");

        SELECT * FROM employee;
 