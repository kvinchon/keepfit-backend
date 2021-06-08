CREATE TABLE users (
	id serial primary key,
	firstName varchar(50) not null,
	lastName varchar(50) not null,
	email varchar(255) unique not null,
	password varchar(255) not null
);