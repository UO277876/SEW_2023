CREATE DATABASE IF NOT EXISTS tienda COLLATE utf8_spanish_ci;
USE tienda;

DROP TABLE IF EXISTS compra, contiene, libreria, libro, autor, usuario;

CREATE TABLE IF NOT EXISTS autor (
	idAutor VARCHAR(9) NOT NULL UNIQUE,
	nombrea VARCHAR(255) NOT NULL, 
	apellidosa VARCHAR(255) NOT NULL, 
	PRIMARY KEY (idAutor)
);

CREATE TABLE IF NOT EXISTS libro (
	idLibro VARCHAR(9) NOT NULL UNIQUE,
	titulo VARCHAR(255) NOT NULL,
    generoLit VARCHAR(255) NOT NULL,
    precio DOUBLE NOT NULL,
    idAutor VARCHAR(9) NOT NULL,
    FOREIGN KEY (idAutor) REFERENCES autor(idAutor),
	PRIMARY KEY (idLibro)
);

CREATE TABLE IF NOT EXISTS libreria (
	idLibreria VARCHAR(9) NOT NULL UNIQUE,
    ciudadl VARCHAR(255) NOT NULL,
	PRIMARY KEY (idLibreria)
);

CREATE TABLE IF NOT EXISTS usuario (
	idUsuario VARCHAR(9) NOT NULL UNIQUE,
	nombreu VARCHAR(255) NOT NULL,
    edadu INTEGER NOT NULL,
    generou VARCHAR(255) NOT NULL,
    emailu VARCHAR(255) NOT NULL,
	PRIMARY KEY (idUsuario)
);

CREATE TABLE IF NOT EXISTS contiene (
	idLibro VARCHAR(9) NOT NULL,
	idLibreria VARCHAR(9) NOT NULL, 
	cantidad INTEGER DEFAULT -1, 
	PRIMARY KEY (idLibro,idLibreria),
	FOREIGN KEY (idLibro) REFERENCES libro(idLibro),
	FOREIGN KEY (idLibreria) REFERENCES libreria(idLibreria)
);

CREATE TABLE IF NOT EXISTS compra (
	idLibro VARCHAR(9) NOT NULL,
	idUsuario VARCHAR(9) NOT NULL,
	PRIMARY KEY (idLibro,idUsuario),
	FOREIGN KEY (idLibro) REFERENCES libro(idLibro),
	FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

INSERT INTO autor (idAutor, nombrea, apellidosa) VALUES ("3-001", "Brandon", "Sanderson");
INSERT INTO autor (idAutor, nombrea, apellidosa) VALUES ("3-002", "Holly", "Black");
INSERT INTO autor (idAutor, nombrea, apellidosa) VALUES ("3-003", "Sarah", "J Maas");
INSERT INTO autor (idAutor, nombrea, apellidosa) VALUES ("3-004", "Stephanie", "Garber");

INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("4323T", "El Imperio Final", "Fantasia", 20, "3-001");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("5432V", "Escuadrón", "Ciencia ficcion", 18, "3-001");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("3245C", "El Archivo de las Tormentas", "Fantasia", 20, "3-001");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("2322T", "El Principe Cruel", "Fantasia", 20, "3-002");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("1212T", "La Reina de la Nada", "Fantasia", 20, "3-002");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("3432B", "Una Corte de Rosas y Espinas", "Fantasia", 25, "3-003");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("4324J", "El Trono de Cristal", "Accion", 21, "3-003");
INSERT INTO libro (idLibro, titulo, generoLit, precio, idAutor) VALUES ("7654T", "Caraval", "Romance", 21, "3-004");

INSERT INTO libreria (idLibreria, ciudadl) VALUES ("645453Y", "Leon");
INSERT INTO libreria (idLibreria, ciudadl) VALUES ("543456T", "Oviedo");
INSERT INTO libreria (idLibreria, ciudadl) VALUES ("522123B", "Madrid");
INSERT INTO libreria (idLibreria, ciudadl) VALUES ("839485V", "Barcelona");

INSERT INTO usuario (idUsuario, nombreu, edadu, generou, emailu) VALUES ("8435795B", "Ivan", 25, "masculino", "itv@gmail.com");
INSERT INTO usuario (idUsuario, nombreu, edadu, generou, emailu) VALUES ("3234950T", "Sara", 21, "femenino", "akatb@gmail.com");
INSERT INTO usuario (idUsuario, nombreu, edadu, generou, emailu) VALUES ("9374619A", "Juan", 17, "masculino", "hdycmb@gmail.com");
INSERT INTO usuario (idUsuario, nombreu, edadu, generou, emailu) VALUES ("9273643G", "Maria", 30, "femenino", "maria_leom@gmail.com");
INSERT INTO usuario (idUsuario, nombreu, edadu, generou, emailu) VALUES ("7438763H", "Alfonso", 22, "otro", "alfonn001@gmail.com");

INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("4323T", "645453Y", 3);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("2322T", "645453Y", 5);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("3432B", "645453Y", 8);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("5432V", "543456T", 1);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("7654T", "543456T", 4);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("3245C", "522123B", 6);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("4323T", "522123B", 2);
INSERT INTO contiene (idLibro, idLibreria, cantidad) VALUES ("1212T", "839485V", 2);

INSERT INTO compra (idLibro, idUsuario) VALUES ("1212T", "8435795B");
INSERT INTO compra (idLibro, idUsuario) VALUES ("7654T", "3234950T");
INSERT INTO compra (idLibro, idUsuario) VALUES ("4323T", "3234950T");
INSERT INTO compra (idLibro, idUsuario) VALUES ("5432V", "9273643G");
INSERT INTO compra (idLibro, idUsuario) VALUES ("3432B", "9374619A");
INSERT INTO compra (idLibro, idUsuario) VALUES ("4323T", "9374619A");
INSERT INTO compra (idLibro, idUsuario) VALUES ("3245C", "9374619A");

