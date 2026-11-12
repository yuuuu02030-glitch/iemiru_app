SET NAMES utf8mb4;

CREATE TABLE login (
    login_id VARCHAR(30) PRIMARY KEY,
    password VARCHAR(70) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT '一般職'
);

CREATE TABLE houses (
    house_id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(30) NOT NULL,
    house_name VARCHAR(30) NOT NULL,
    description TEXT DEFAULT NULL,
    image_url_1 VARCHAR(255),
    image_url_2 VARCHAR(255),
    image_url_3 VARCHAR(255),
    image_url_4 VARCHAR(255)
);

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(11) NOT NULL,
    build_type VARCHAR(50) DEFAULT NULL,
    build_timing VARCHAR(50) DEFAULT NULL,
    build_area VARCHAR(50) DEFAULT NULL,
    visit_reason VARCHAR(50) DEFAULT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    reception_no VARCHAR(8) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    visit_datetime DATETIME NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

CREATE TABLE visit_records (
    visit_record_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    reservation_id INT NOT NULL,
    house_id INT NOT NULL,
    wish BOOLEAN NOT NULL DEFAULT FALSE,
    visited BOOLEAN NOT NULL DEFAULT FALSE,
    favorite BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE CASCADE,
    FOREIGN KEY (house_id) REFERENCES houses(house_id)
);