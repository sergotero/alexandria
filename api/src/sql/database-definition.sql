-- alexandria
DROP DATABASE IF EXISTS alexandria;
CREATE DATABASE alexandria CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE alexandria;

CREATE TABLE books(
	id INT UNSIGNED AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  language ENUM('Español', 'Inglés', 'Alemán', 'Japonés'),
  format ENUM('Impreso', 'Digital', 'Ambos'),
		CONSTRAINT pk_books PRIMARY KEY books (id),
      CONSTRAINT uq_books UNIQUE (title)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE collections(
	id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,
		CONSTRAINT pk_collections PRIMARY KEY collections (id),
      CONSTRAINT uq_collections UNIQUE (name)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE tags(
	id INT UNSIGNED AUTO_INCREMENT,
  tag VARCHAR(60) NOT NULL,
		CONSTRAINT pk_tags PRIMARY KEY tags (id),
      CONSTRAINT uq_tags UNIQUE (tag)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE series(
	id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  total_vol INT UNSIGNED,
  status ENUM('Abierta', 'Cerrada', 'Desconocido'),
		CONSTRAINT pk_series PRIMARY KEY series (id),
      CONSTRAINT uq_series UNIQUE (name)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE authors(
	id INT UNSIGNED AUTO_INCREMENT,
  name VARCHAR(60),
	lastname1 VARCHAR(60),
	lastname2 VARCHAR (60),
	lastname3 VARCHAR (60),
	alias VARCHAR(255) AS (CONCAT_WS(name, lastname1, lastname2, lastname3)) VIRTUAL,
		CONSTRAINT pk_authors PRIMARY KEY authors (id),
      CONSTRAINT uq_authors UNIQUE (alias)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE bookscollections(
	id INT UNSIGNED AUTO_INCREMENT,
  book_id INT UNSIGNED,
  collection_id INT UNSIGNED,
		CONSTRAINT pk_bookscollections PRIMARY KEY bookscollections (id),
      CONSTRAINT uq_bookscollections UNIQUE (book_id, collection_id),
      CONSTRAINT fk_lc_books FOREIGN KEY (book_id) REFERENCES books(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_lc_collections FOREIGN KEY (collection_id) REFERENCES collections(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE bookstags(
  id INT UNSIGNED AUTO_INCREMENT,
  book_id INT UNSIGNED,
  tag_id INT UNSIGNED,
		CONSTRAINT pk_booksTags PRIMARY KEY booksTags (id),
      CONSTRAINT uq_booksTags UNIQUE (book_id, tag_id),
      CONSTRAINT fk_lt_books FOREIGN KEY (book_id) REFERENCES books(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_lt_tags FOREIGN KEY (tag_id) REFERENCES tags(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE booksseries(
  id INT UNSIGNED AUTO_INCREMENT,
  book_id INT UNSIGNED,
  series_id INT UNSIGNED,
  index_series DOUBLE,
		CONSTRAINT pk_booksSeries PRIMARY KEY booksSeries (id),
      CONSTRAINT uq_booksSeries UNIQUE (book_id, series_id),
      CONSTRAINT fk_ls_books FOREIGN KEY (book_id) REFERENCES books(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_ls_series FOREIGN KEY (series_id) REFERENCES series(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE TABLE booksauthors(
  id INT UNSIGNED AUTO_INCREMENT,
  book_id INT UNSIGNED,
  author_id INT UNSIGNED,
  description LONGTEXT,
		CONSTRAINT pk_booksauthors PRIMARY KEY booksauthors (id),
      CONSTRAINT uq_booksauthors UNIQUE (book_id, author_id),
      CONSTRAINT fk_la_books FOREIGN KEY (book_id) REFERENCES books(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
      CONSTRAINT fk_la_authors FOREIGN KEY (author_id) REFERENCES authors(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

/*
El parámetro puntuación originalmente se diseñó como DECIMAL (4,2) UNSIGNED pero parece ser que es un método depreciado que va a desaparecer en las próximas versiones.
*/

CREATE TABLE readbooks(
	id INT UNSIGNED AUTO_INCREMENT,
  book_id INT UNSIGNED NOT NULL,
  author_id INT UNSIGNED NOT NULL,
  reading_date DATE,
  score DOUBLE,
  comments LONGTEXT,
		CONSTRAINT ch_score CHECK (score >= 00.00 AND score <= 10.00),
      CONSTRAINT pk_readbooks PRIMARY KEY readbooks (id),
      CONSTRAINT uq_readbooks UNIQUE (book_id, author_id),
      CONSTRAINT fk_ll_title FOREIGN KEY (book_id) REFERENCES books(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE,
		CONSTRAINT fk_ll_autor FOREIGN KEY (author_id) REFERENCES authors(id)
			ON DELETE CASCADE
        ON UPDATE CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

INSERT INTO alexandria.collections (name) VALUES ('Artes');
INSERT INTO alexandria.collections (name) VALUES ('Autoayuda');
INSERT INTO alexandria.collections (name) VALUES ('Aventuras');
INSERT INTO alexandria.collections (name) VALUES ('Bélico');
INSERT INTO alexandria.collections (name) VALUES ('Biografía');
INSERT INTO alexandria.collections (name) VALUES ('Ciencia ficción');
INSERT INTO alexandria.collections (name) VALUES ('Clásicos');
INSERT INTO alexandria.collections (name) VALUES ('Contemporáneo');
INSERT INTO alexandria.collections (name) VALUES ('Distopía');
INSERT INTO alexandria.collections (name) VALUES ('Divulgación');
INSERT INTO alexandria.collections (name) VALUES ('Drama');
INSERT INTO alexandria.collections (name) VALUES ('Esoterismo');
INSERT INTO alexandria.collections (name) VALUES ('Espiritualidad');
INSERT INTO alexandria.collections (name) VALUES ('Fantasía');
INSERT INTO alexandria.collections (name) VALUES ('Filosofía');
INSERT INTO alexandria.collections (name) VALUES ('Histórico');
INSERT INTO alexandria.collections (name) VALUES ('Humor');
INSERT INTO alexandria.collections (name) VALUES ('LGBTQ');
INSERT INTO alexandria.collections (name) VALUES ('LGBTQ autoeditado');
INSERT INTO alexandria.collections (name) VALUES ('Lingüística');
INSERT INTO alexandria.collections (name) VALUES ('Manuales');
INSERT INTO alexandria.collections (name) VALUES ('Misterio');
INSERT INTO alexandria.collections (name) VALUES ('Novela erótica');
INSERT INTO alexandria.collections (name) VALUES ('Parapsicología');
INSERT INTO alexandria.collections (name) VALUES ('Poesía épica');
INSERT INTO alexandria.collections (name) VALUES ('Poesía lírica');
INSERT INTO alexandria.collections (name) VALUES ('Policíaco');
INSERT INTO alexandria.collections (name) VALUES ('Romance');
INSERT INTO alexandria.collections (name) VALUES ('Social');
INSERT INTO alexandria.collections (name) VALUES ('Terror');
INSERT INTO alexandria.collections (name) VALUES ('Ufología');
INSERT INTO alexandria.collections (name) VALUES ('Zombies');

-- CREATE USER IF NOT EXISTS "bibliotecario"@"localhost" IDENTIFIED BY "f4r0D3Lc0n0c1m13nt0!";
-- GRANT ALL PRIVILEGES ON alexandria.* TO "bibliotecario"@"localhost";