USE employeeTracker_db;
INSERT INTO department (name)
VALUES ("Shoes"),
       ("Mens"),
       ("Womens"),
       ("Childrens"),
       ("Watches");

INSERT INTO roles (title, salary, department_id)
VALUES 
    ("Sales Manager", 70000, 1),
    ("Assistant Manager", 50000, 1),
    ("Sales Associate", 35000, 1),
    ("Department Manager", 75000, 2),
    ("Salesperson", 40000, 2),
    ("Associate Manager", 45000, 3),
    ("Sales Consultant", 30000, 3),
    ("Supervisor", 60000, 4),
    ("Sales Associate", 32000, 4),
    ("Janitor", 28000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Manin", "Prince", 1, 1),
    ("Barry", "Allen", 2, 1),
    ("Peter", "Parker", 3, 1),
    ("Selina", "Kyle", 4, 1),
    ("Tony", "Stark", 5, 2),
    ("Natasha", "Romanoff", 6, 2),
    ("Ishmel", "Ragnarok", 7, 2),
    ("Scott", "Adkins", 8, 3),
    ("John", "Green", 9, 3),
    ("Bruce", "Springstein", 10, 3);