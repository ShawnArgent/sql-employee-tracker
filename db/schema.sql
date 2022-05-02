DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE Employee (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    foreign key(role_id) references roles(id),
    foreign key(manager_id) references Employee(manager_id)
	); 

CREATE TABLE department (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name  VARCHAR (30) NOT NULL);

CREATE TABLE roles (
	id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title  VARCHAR(30) NOT NULL,
    salary DECIMA (10,2) NOT NULL,
    department_id integer NOT NULL, 
    foreign key(department_id) references Department(id)
	);  

