const express = require('express');

const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    });
  
    connection.connect(err => {
        if (err) throw err;
        console.log('connected as id ' + connection.threadId);
        afterConnection();
      });
  
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
      