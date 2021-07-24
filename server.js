const inquirer = require('inquirer');
const util = require('./util/util.js');
const dbUtils = require('./util/util.js');

init();

function init() {
  inquirer.prompt([
    {
      type: 'list',
      choices: [
        'Add department',
        'Add role',
        'Add employee',
        'View department',
        'View roles',
        'View employees',
        'Update employee role',
        'Delete employee',
        'Delete role',
        'Delete department',
        'Quit',
      ],
      message: 'What would you like to do?',
      name: 'options'
    }
  ])
  .then((answer) => {
    switch (answer.options) {
      case 'View department':
        return viewDepartment();
      case 'View roles':
        return viewRoles();
      case 'View employees':
        return viewEmployees();
      case 'Add department':
        return addDepartment();
      case 'Add role':
        return addRole();
      case 'Add employee':
        return addEmployee();
      case 'Update employee role':
        return updateEmployeeRole();
      case 'Delete employee':
        return deleteEmployee();
      case 'Delete role':
        return deleteRole();
      case 'Delete department':
        return deleteDepartment();
      case 'Quit':
        return quit();
    }
  });
}
async function viewDepartment() {
  const departments = await dbUtils.viewDepartment();
  console.table(departments);
  init();
}
async function viewRoles() {
  const role = await dbUtils.viewRoles();
  console.table(role);
  init();
}
async function viewEmployees() {
  const employees = await dbUtils.getEmployees();
  console.table(employees);
  init();
}
async function addDepartment() {
  const department = await inquirer.prompt([
    {
      type: 'input',
      message: 'What department would you like to add?',
      name: 'name'
    }
  ]);
  await dbUtils.createDepartment(department);
  init();
}
async function addRole() {
  const departments = await dbUtils.viewDepartment();
  const departmentList = departments.map(({ id, name }) => ({ name: name, value: id }));
  const roleAdded = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new roles name?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is the salary of this role?',
      name: 'salary',
    },
    {
      type: 'list',
      message: 'What is the department id number?',
      name: 'departmentId',
      choices: departmentList,
    },
  ]);
  await dbUtils.addRole(roleAdded);
  init();
}
async function addEmployee() {
  const roleOptions = await util.viewRoles();
  const managerOptions = await util.getEmployees();
  const employeeToAdd = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is your employees first name?',
      name: 'firstName',
    },
    {
      type: 'input',
      message: 'What is your employees last name?',
      name: 'lastName',
    },
  ]);
  let roleChoices = roleOptions.map(({ id, title }) => ({ name: title, value: id }));
  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'What is the new employees role?',
      choices: roleChoices,
    }
  ]);
  const managerChoices = managerOptions.map(({ firstName, lastName, id }) => ({ name: firstName + lastName, value: id }));
  if (managerChoices && managerChoices.length > 0){
    const { managerId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'managerId',
        message: 'Select new employees manager:',
        choices: managerChoices,
      }
    ]);
    employeeToAdd.managerId = managerId;
  }
employeeToAdd.roleId = roleId;
await util.createEmployee(employeeToAdd);
init();
}
async function updateEmployeeRole() {
  const employeeOptions = await util.getEmployees();
  const roleOptions = await util.viewRoles();
  console.log('roleOptions');
  const employeeToChooseFrom = employeeOptions.map(({ id, firstName, lastName }) => ({
    name: firstName + lastName,
    value: id,
  }));
  const roleToChooseFrom = roleOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'What employee would you like to change roles for?',
      choices: employeeToChooseFrom,
    },
  ]);
  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'What new role would you like for this employee?',
      choices: roleToChooseFrom,
    },
  ]);
  await util.updateEmployeeRole(employeeId, roleId);
  init();
}
async function deleteEmployee() {
  const employeeOptions = await util.getEmployees();
  const employeeToChooseFrom = employeeOptions.map(({ id, firstName, lastName }) => ({
    name: firstName + lastName,
    value: id,
  }));
  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'What employee would you like to change roles for?',
      choices: employeeToChooseFrom,
    },
  ]);
  await util.removeEmployee(employeeId);
  init();
}
async function deleteRole() {
  const roleOptions = await util.viewRoles();
  const roleToChooseFrom = roleOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'What role do you want to delete?',
      choices: roleToChooseFrom,
    },
  ]);
  await util.removeRole(roleId);
  init();
}
async function deleteDepartment() {
  const departmentOptions = await util.viewDepartment();
  const departmentToChooseFrom = departmentOptions.map(({ id, name }) => ({ name: name, value: id }));
  const { departmentId } = await inquirer.prompt([
    {
    type: 'list',
    name: 'departmentId',
    message: 'What department do you want to delete?',
    choices: departmentToChooseFrom,
    }
  ]);
  await util.removeDepartment(departmentId);
  init();
}
function quit() {
  process.exit();
}
