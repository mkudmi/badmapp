CREATE DATABASE UserManagement;
USE UserManagement;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE owners(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL UNIQUE,
    pass VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE games(
    id INT NOT NULL AUTO_INCREMENT,
    date timestamp NOT NULL,
    owner VARCHAR(255) NOT NULL,
    fields INT NOT NULL,
    places BIGINT NOT NULL,
    price BIGINT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users_games(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    date timestamp NOT NULL,
    PRIMARY KEY (id)
);