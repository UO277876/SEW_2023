CREATE DATABASE IF NOT EXISTS records COLLATE utf8_spanish_ci;
USE records;

DROP TABLE IF EXISTS registro;

CREATE TABLE IF NOT EXISTS registro (
    nombre VARCHAR(255) NOT NULL,
	apellidos VARCHAR(255) NOT NULL, 
	nivel VARCHAR(255) NOT NULL, 
	tiempo INTEGER NOT NULL
);

INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j1","j1","facil",10);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j2","j2","facil",5);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j3","j3","facil",60);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j4","j4","facil",360);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j5","j5","facil",50);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j6","j6","facil",45);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j7","j7","facil",2);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j8","j8","facil",20);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j9","j9","facil",240);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j10","j10","facil",34);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j11","j11","facil",35);

INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j12","j12","medio",1);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j13","j13","medio",17);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j14","j14","medio",25);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j15","j15","medio",345);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j16","j16","medio",220);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j17","j17","medio",233);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j18","j18","medio",360);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j19","j19","medio",243);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j20","j20","medio",112);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j21","j21","medio",3);

INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j22","j22","dificil",60);
INSERT INTO registro(nombre,apellidos,nivel,tiempo) VALUES("j23","j23","dificil",345);