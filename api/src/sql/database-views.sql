CREATE VIEW catalogue AS
SELECT booksauthors.author_id AS author_id,
  booksauthors.book_id AS book_id,
  series.id AS series_id,
  collections.id AS collection_id,
  authors.alias AS author,
  books.title AS title,
  series.name AS series,
  booksseries.index_series AS Nº,
  collections.name AS collection
FROM authors
  LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
  LEFT JOIN books ON booksauthors.book_id = books.id
  LEFT JOIN booksseries ON booksseries.book_id = books.id
  LEFT JOIN series ON series.id = booksseries.series_id
  LEFT JOIN bookscollections ON bookscollections.book_id = books.id
  LEFT JOIN collections ON collections.id = bookscollections.collection_id
ORDER BY author,
  series,
  Nº,
  collection;


CREATE VIEW readings AS
SELECT readbooks.id AS id,
  readbooks.book_id AS book_id,
  readbooks.author_id AS author_id,
  books.title AS title,
  authors.alias AS author,
  readbooks.reading_date AS reading_date,
  readbooks.score AS score,
  readbooks.comments AS comments
FROM readbooks
  JOIN books ON books.id = readbooks.book_id
  JOIN authors ON authors.id = readbooks.author_id
ORDER BY alias,
  title,
  reading_date;


CREATE VIEW full_catalogue AS
SELECT booksauthors.author_id AS author_id,
  booksauthors.book_id AS book_id,
  series.id AS series_id,
  collections.id AS collection_id,
  authors.alias AS author,
  books.title AS title,
  booksauthors.description AS description,
  books.language AS language,
  books.format AS format,
  series.name AS series,
  booksseries.index_series AS Nº,
  series.total_vol AS total_vol,
  series.status AS status,
  collections.name AS collection
FROM authors
  LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
  LEFT JOIN books ON booksauthors.book_id = books.id
  LEFT JOIN booksseries ON booksseries.book_id = books.id
  LEFT JOIN series ON series.id = booksseries.series_id
  LEFT JOIN bookscollections ON bookscollections.book_id = books.id
  LEFT JOIN collections ON collections.id = bookscollections.collection_id
ORDER BY author,
  series,
  Nº,
  collection;