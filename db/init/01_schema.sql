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

-- CREATE TABLE reservations ();

-- CREATE TABLE visit_records ();