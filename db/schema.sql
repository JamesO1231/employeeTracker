DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR (20) UNIQUE NOT NULL
);
    CREATE TABLE role
    (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY ,
		title VARCHAR (20) NOT NULL,
		salary DECIMAL NOT NULL,
        department_id INT UNSIGNED NOT NULL,
		CONSTRAINT fk_department FOREIGN KEY
        (department_id) REFERENCES department
        (id) ON
        DELETE CASCADE
       
);
        CREATE TABLE employee
        (
            id INT
            UNSIGNED
            AUTO_INCREMENT PRIMARY KEY,
			first_name VARCHAR
            (20) NOT NULL,
			last_name VARCHAR
            (20) NOT NULL,
			role_id INT UNSIGNED NOT NULL,
            CONSTRAINT fk_role FOREIGN KEY
            (role_id) REFERENCES role
            (id) ON
            DELETE CASCADE,
            manager_id INT UNSIGNED,
            CONSTRAINT fk_manager FOREIGN KEY
            (manager_id) REFERENCES employee
            (id) ON
            DELETE
            SET NULL
            );