-- Biblioteca
DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE biblioteca;

CREATE TABLE libros(
	id INT UNSIGNED AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  idioma ENUM('Español', 'Inglés', 'Alemán', 'Japonés'),
  formato ENUM('Impreso', 'Digital', 'Ambos'),
		CONSTRAINT pk_libros PRIMARY KEY libros (id),
      CONSTRAINT uq_libros UNIQUE (titulo)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE colecciones(
	id INT UNSIGNED AUTO_INCREMENT,
  nombre VARCHAR(60) NOT NULL,
		CONSTRAINT pk_colecciones PRIMARY KEY colecciones (id),
      CONSTRAINT uq_colecciones UNIQUE (nombre)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE tags(
	id INT UNSIGNED AUTO_INCREMENT,
  tag VARCHAR(60) NOT NULL,
		CONSTRAINT pk_tags PRIMARY KEY tags (id),
      CONSTRAINT uq_tags UNIQUE (tag)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE series(
	id INT UNSIGNED AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  total_vol INT UNSIGNED,
  estado ENUM('Abierta', 'Cerrada', 'Desconocido'),
		CONSTRAINT pk_series PRIMARY KEY series (id),
      CONSTRAINT uq_series UNIQUE (nombre)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE autores(
	id INT UNSIGNED AUTO_INCREMENT,
  nombre VARCHAR(60),
	apellido1 VARCHAR(60),
	apellido2 VARCHAR (60),
	apellido3 VARCHAR (60),
	alias VARCHAR(255),
		CONSTRAINT pk_autores PRIMARY KEY autores (id),
      CONSTRAINT uq_autores UNIQUE (alias)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE librosColecciones(
	id INT UNSIGNED AUTO_INCREMENT,
  id_libro INT UNSIGNED,
  id_coleccion INT UNSIGNED,
		CONSTRAINT pk_librosColecciones PRIMARY KEY librosColecciones (id),
      CONSTRAINT uq_librosColecciones UNIQUE (id_libro, id_coleccion),
      CONSTRAINT fk_lc_libros FOREIGN KEY (id_libro) REFERENCES libros(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_lc_colecciones FOREIGN KEY (id_coleccion) REFERENCES colecciones(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE librosTags(
  id INT UNSIGNED AUTO_INCREMENT,
  id_libro INT UNSIGNED,
  id_tag INT UNSIGNED,
		CONSTRAINT pk_librosTags PRIMARY KEY librosTags (id),
      CONSTRAINT uq_librosTags UNIQUE (id_libro, id_tag),
      CONSTRAINT fk_lt_libros FOREIGN KEY (id_libro) REFERENCES libros(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_lt_tags FOREIGN KEY (id_tag) REFERENCES tags(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE librosSeries(
  id INT UNSIGNED AUTO_INCREMENT,
  id_libro INT UNSIGNED,
  id_serie INT UNSIGNED,
  index_serie DOUBLE,
		CONSTRAINT pk_librosSeries PRIMARY KEY librosSeries (id),
      CONSTRAINT uq_librosSeries UNIQUE (id_libro, id_serie),
      CONSTRAINT fk_ls_libros FOREIGN KEY (id_libro) REFERENCES libros(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_ls_series FOREIGN KEY (id_serie) REFERENCES series(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE librosAutores(
  id INT UNSIGNED AUTO_INCREMENT,
  id_libro INT UNSIGNED,
  id_autor INT UNSIGNED,
  descripcion LONGTEXT,
		CONSTRAINT pk_librosAutores PRIMARY KEY librosAutores (id),
      CONSTRAINT uq_librosAutores UNIQUE (id_libro, id_autor),
      CONSTRAINT fk_la_libros FOREIGN KEY (id_libro) REFERENCES libros(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_la_autores FOREIGN KEY (id_autor) REFERENCES autores(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

/*
El parámetro puntuación originalmente se diseñó como DECIMAL (4,2) UNSIGNED pero parece ser que es un método depreciado que va a desaparecer en las próximas versiones.
*/

CREATE TABLE librosLeidos(
	id INT UNSIGNED AUTO_INCREMENT,
  id_libro INT UNSIGNED NOT NULL,
  id_autor INT UNSIGNED NOT NULL,
  f_lectura DATE,
  puntuacion DOUBLE,
  comentario LONGTEXT,
		CONSTRAINT ch_puntuacion CHECK (puntuacion >= 00.00 AND puntuacion <= 10.00),
      CONSTRAINT pk_librosLeidos PRIMARY KEY librosLeidos (id),
      CONSTRAINT uq_librosLeidos UNIQUE (id_libro, id_autor),
      CONSTRAINT fk_ll_titulo FOREIGN KEY (id_libro) REFERENCES libros(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
		CONSTRAINT fk_ll_autor FOREIGN KEY (id_autor) REFERENCES autores(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

INSERT INTO biblioteca.colecciones (nombre) VALUES ('Artes');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Autoayuda');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Aventuras');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Bélico');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Biografía');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Ciencia ficción');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Clásicos');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Contemporáneo');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Distopía');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Divulgación');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Drama');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Esoterismo');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Espiritualidad');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Fantasía');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Filosofía');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Histórico');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Humor');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('LGBTQ');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('LGBTQ autoeditado');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Lingüística');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Manuales');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Misterio');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Novela erótica');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Parapsicología');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Poesía épica');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Poesía lírica');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Policíaco');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Romance');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Social');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Terror');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Ufología');
INSERT INTO biblioteca.colecciones (nombre) VALUES ('Zombies');

CREATE USER IF NOT EXISTS "bibliotecario"@"localhost" IDENTIFIED BY "Alejandria123!";
GRANT ALL PRIVILEGES ON biblioteca.* TO "bibliotecario"@"localhost";