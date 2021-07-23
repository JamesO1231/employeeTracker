USE employee_db;

INSERT INTO department (name)
VALUES 
    ('Oil and Gas'),
    ('Title and Lease');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Landman', 130000, 1),
    ('Lease Analyst', 100000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ('John', 'Bill',1,NULL),
    ('Brett', 'Bryan',2,1);