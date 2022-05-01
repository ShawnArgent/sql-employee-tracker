DROP DATABASE IF EXISTS employee_db;
CREATE datbase employee_db;

CREATE TABLE Department (
    id INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,0) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
    
)

CREATE TABLE employeee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    
);