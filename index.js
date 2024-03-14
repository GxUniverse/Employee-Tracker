// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./dB/connection');


function start() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'answer',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit'],
        }
    ])
        .then((data) => {
            if (data.answer === 'view all departments') {
                view_department()
            } else if (data.answer === 'view all roles') {
                view_roles()
            } else if (data.answer === 'view all employees') {
                view_employees()
            } else if (data.answer === 'add a department') {
                add_department()
            } else if (data.answer === 'add a role') {
                add_role()
            } else if (data.answer === 'add an employee') {
                add_employee()
            } else if (data.answer === 'update an employee role') {
                update_role()
            } else {
                process.exit()
            }
        })
};

function view_department() {
    db.query('SELECT * FROM department', function (err, data) {
        console.table(data)
        start()
    })

}

function view_roles() {
    db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id', function (err, data) {
        console.table(data)
        start()
    })
}

function view_employees() {
    db.query("SELECT employee.id, employee.first_name, employee.last_name, r.title AS role, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee INNER JOIN roles r ON employee.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON employee.manager_id = m.id",
        function (err, data) {
            if(err) throw new Error(err)
            console.table(data)
            start()
        })
}

function add_department() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'name'
        }
    ])
        .then((data) => {
            db.query('INSERT INTO department (name) VALUES (?)', [data.name], function (err, data) {
                console.log("department added to database")
                start()
            })
        })
}

function add_role() {
    db.query('SELECT * FROM department', function (err, data) {
        const departments = data.map(({ id, name }) => ({
            name: name,
            value: id

        }))
        start()
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the title of the role?',
                name: 'title'
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What is department does this role belong to?',
                name: 'department_id',
                choices: departments
            }
        ])
            .then((data) => {
                db.query('INSERT INTO roles SET ?', data,
                    function (err, data) {
                        console.log('created new role')
                        start()
                    })
            })
    })
}

async function add_employee() {
    const [roleData] = await db.promise().query('SELECT * FROM roles');
    console.log(roleData)

    const roleChoices = roleData.map(({ id, title }) => ({
        name: title,
        value: id

    }))

    const [managerData] = await db.promise().query('SELECT * FROM employee');

    const managerChoices = managerData.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id

    }))

    inquirer.prompt([
        {
            type: 'list',
            message: 'What is their role?',
            name: 'role_id',
            choices: roleChoices
        },
        {
            type: 'input',
            message: 'What is their first name',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'What is their last name',
            name: 'last_name'
        },
        {
            type: 'list',
            message: 'Who is their manager?',
            name: "manager_id",
            choices: managerChoices
        }

    ])
        .then((data) => {
            db.query('INSERT INTO employee SET ?', data,
            function (err, data) {
                console.log('created new employee')
                start()
            })
        })
}

function update_role() {

}


start();
