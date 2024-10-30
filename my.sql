--- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    email VARCHAR,
    password BIGINT,
    fullname VARCHAR,
    creat_at DATE,
    update_at DATE
);

-- Categories table
CREATE TABLE categoriya (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    description TEXT,
    par_id BIGINT  -- Parent category ID for hierarchical structure
);

-- Sellers table
CREATE TABLE Seller (
    id BIGINT PRIMARY KEY,
    name VARCHAR,
    title TEXT,
    adress VARCHAR
);

-- Markets table
CREATE TABLE Market (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    user_id INT,
    is_admin BIGINT,
    creat_at DATE,
    update_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Product table (as visible in the diagram)
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR,
    creat_at DATE,
    update_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);