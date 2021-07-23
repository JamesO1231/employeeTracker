const connection = require('../db/connection.js');

class dbQueryUtil {
    constructor(connection) {
        this.connection = connection;
    }
    getEmployees() {
        return this.connection.query('SELECT * FROM employee');
    }
    createEmployee(employee) {
        return this.connection.query('INSERT INTO employee SET ?', employee);
    }
    updateEmployeeRole() {
        return this.connection.query('UPDATE employee SET roleId = roleId WHERE firstName = name');
    }
    viewRoles() { 
        return this.connection.query('SELECT id, title, salary, departmentId AS role FROM role');
    }
    addRole(newRole) {
        return this.connection.query('INSERT INTO role SET ?', newRole);
    }
    viewDepartment() {
        return this.connection.query('SELECT * FROM department');
    }
    createDepartment(department) {
        return this.connection.query('INSERT INTO department SET ?', department);
    }
    updateEmployeeRole(employeeId, newRoleId) {
        console.log('inside query');
        return this.connection.query('UPDATE employee SET roleId = ? WHERE id = ?', [newRoleId, employeeId]);
    }
    removeEmployee(id) {
        return this.connection.query('DELETE FROM employee WHERE id = ?', id);
    }
    removeRole(id) {
        return this.connection.query('DELETE FROM role WHERE id = ?', id);
    }
    removeDepartment(id) {
        return this.connection.query('DELETE FROM department WHERE id = ?', id);
    }
}
module.exports = new dbQueryUtil(connection);