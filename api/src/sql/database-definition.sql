DROP DATABASE IF EXISTS alexandria;
CREATE DATABASE alexandria CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE alexandria;

CREATE TABLE books(
	id INT UNSIGNED AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  language ENUM('Español', 'Inglés', 'Alemán', 'Japonés'),
  -- language ENUM('Spanish', 'English', 'German', 'Japanese'),
  format ENUM('Impreso', 'Digital', 'Ambos'),
  -- format ENUM('Printed', 'Digital', 'Both'),
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
  -- status ENUM('Open', 'Closed', 'Unkown'),
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


-- Important: change the following parameters:

CREATE USER IF NOT EXISTS "user"@"host" IDENTIFIED BY "secret";
GRANT ALL PRIVILEGES ON alexandria.* TO "user"@"host";