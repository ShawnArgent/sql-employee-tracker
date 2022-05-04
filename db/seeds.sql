USE employees_db;


INSERT INTO department (department_name)
VALUES('Management'),
        ('Engineering'),
        ('HR');
        
INSERT INTO role (title, salary, department_id) 
VALUES('CEO', 250000, 1),
        ('Tech Director', 125000, 2),
        ('HR Director', 100000, 3),
        ('CFO', 175000, 1),
        ('Developer', 850000, 2),
        ('Admin', 65000, 3);
    
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES('Jacob', 'Samuel', 1, NULL),
        ('Robert', 'Chase', 2, 1),
        ('Amber', 'Thompson', 2, 1),
        ('Patrick', 'OBrien', 3, NULL),
        ('Kerrie', 'Benz', 4, 4),
        ('Luke', 'Anderson', 4, 4),
        ('Toby', 'Arnold', 5, NULL),
        ('Jose', 'Garcia', 6, 7),
        ('Kate', 'Luo', 6, 7);