USE employeeTracker_db;

-- Query to view all departments
SELECT * FROM department;

-- Query to view all roles
SELECT * FROM roles;

-- Query to view all employees
SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id;

-- Query to add and delete a departments, roles, employees, 
INSERT INTO department (name) VALUES ('Accessories');

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Manager', 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);

UPDATE employee SET role_id = 2 WHERE id = 5;