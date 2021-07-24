DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (20) UNIQUE NOT NULL
);
    CREATE TABLE role
    (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
		title VARCHAR (20) NOT NULL,
		salary DECIMAL NOT NULL,
        departmentId INT UNSIGNED NOT NULL,
		CONSTRAINT fk_department FOREIGN KEY
        (departmentId) REFERENCES department
        (id) ON
        DELETE CASCADE
       
);
        CREATE TABLE employee
        (
            id INT
            UNSIGNED
            AUTO_INCREMENT PRIMARY KEY,
			firstName VARCHAR
            (20) NOT NULL,
			lastName VARCHAR
            (20) NOT NULL,
			roleId INT UNSIGNED NOT NULL,
            CONSTRAINT fk_role FOREIGN KEY
            (roleId) REFERENCES role
            (id) ON
            DELETE CASCADE,
            managerId INT UNSIGNED,
            CONSTRAINT fk_manager FOREIGN KEY
            (managerId) REFERENCES employee
            (id) ON
            DELETE
            SET NULL
            );