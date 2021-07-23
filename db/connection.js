const mysql = require("mysql"); 
const util = require("util"); 

const connection = mysql.createConnection({
    port: 3001,
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'employee_db',
});
   
connection.connect();

connection.query = util.promisify(connection.query); 
    
module.exports = connection; 