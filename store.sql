DROP DATABASE IF EXISTS storefront;

CREATE DATABASE storefront;

USE storefront;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VAR CHAR(60) NOT NULL UNIQUE,
    department_name VARCHAR(60),
    price FLOAT DEFAULT 0,
    stock_quanity INT DEFAULT 0,
    product_sales FLOAT DEFAULT 0,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Lawn Mower", "Gardening", "70.00", "5");
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("PS4", "Electronics", "200.00", "10"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Towels", "Home", "10.00", "120"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("24 Pack of Water", "Food", "5.00", "1000"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("3D Printer", "Electronics", "800.00", "1"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Mulch", "Gardening", "20.00", "70"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Toilet Paper", "Home", "30.00", "50"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Granola Bars", "Food", "12.00", "26"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Crayons", "Arts", "4.00", "77"); 
INSERT INTO products (product_name, department_name, price, stock_quanity) VALUES ("Paint", "Arts", "40.00", "23"); 

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(60) NOT NULL UNIQUE,
    over_head_costs FLOAT DEFAULT 0, 
    PRIMARY KEY(department_id)
);

INSERT INTO departments (department_name) VALUES ("Gardening");
INSERT INTO departments (department_name) VALUES ("Electronics");
INSERT INTO departments (department_name) VALUES ("Food");
INSERT INTO departments (department_name) VALUES ("Home");
INSERT INTO departments (department_name) VALUES ("Arts");

