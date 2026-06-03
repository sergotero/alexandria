import type { FullBook } from "@shared/types";
import { query } from "../config/db-query.config.js";

export async function findAll(): Promise<FullBook[]> {
  return await query(`
    SELECT booksauthors.author_id AS author_id,
      booksauthors.book_id AS book_id,
      series.id AS series_id,
      collections.id AS collection_id,
      authors.name AS author_name,
      authors.lastname1 AS author_lastname1,
      authors.lastname2 AS author_lastname2,
      authors.lastname3 AS author_lastname3,
      authors.alias AS author_alias,
      books.title AS title,
      booksauthors.description AS description,
      booksauthors.cover AS cover,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name
    FROM authors
      LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
      LEFT JOIN books ON booksauthors.book_id = books.id
      LEFT JOIN booksseries ON booksseries.book_id = books.id
      LEFT JOIN series ON series.id = booksseries.series_id
      LEFT JOIN bookscollections ON bookscollections.book_id = books.id
      LEFT JOIN collections ON collections.id = bookscollections.collection_id
    ORDER BY author_alias,
      series_name,
      indexVolume,
      collection_name
  `);
}

export async function findById(id: string): Promise<any[]> {
  return await query(`
    SELECT booksauthors.author_id AS author_id,
      booksauthors.book_id AS book_id,
      series.id AS series_id,
      collections.id AS collection_id,
      authors.name AS author_name,
      authors.lastname1 AS author_lastname1,
      authors.lastname2 AS author_lastname2,
      authors.lastname3 AS author_lastname3,
      authors.alias AS author_alias,
      books.title AS title,
      booksauthors.description AS description,
      booksauthors.cover AS cover,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name
    FROM authors
      LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
      LEFT JOIN books ON booksauthors.book_id = books.id
      LEFT JOIN booksseries ON booksseries.book_id = books.id
      LEFT JOIN series ON series.id = booksseries.series_id
      LEFT JOIN bookscollections ON bookscollections.book_id = books.id
      LEFT JOIN collections ON collections.id = bookscollections.collection_id
    WHERE booksauthors.book_id = ?
    ORDER BY author_alias,
      series_name,
      indexVolume,
      collection_name
  `, [id]);
}
