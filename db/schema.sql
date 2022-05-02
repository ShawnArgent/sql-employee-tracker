DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;



CREATE TABLE department (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR (30) NOT NULL
    );

CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title  VARCHAR(30) NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL, 
    FOREIGN KEY(department_id) references department(id)
	);  

CREATE TABLE Employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES Employee(manager_id)
	); 