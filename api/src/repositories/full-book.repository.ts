import type { FullBook } from "@shared/types";
import { query } from "../config/db-query.config.js";

export async function findAll(limit: number, offset: number): Promise<FullBook[]> {
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name,
      collections.color_code AS color_code
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
    LIMIT ?
    OFFSET ?
  `, [limit, offset]);
}

export async function findById(id: number): Promise<any[]> {
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name,
      collections.color_code AS color_code
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


export async function findByTitle(title: string, limit: number, offset: number): Promise<any[]> {
  
  const alteredTitle = `%${title}%`;
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name,
      collections.color_code AS color_code
    FROM authors
      LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
      LEFT JOIN books ON booksauthors.book_id = books.id
      LEFT JOIN booksseries ON booksseries.book_id = books.id
      LEFT JOIN series ON series.id = booksseries.series_id
      LEFT JOIN bookscollections ON bookscollections.book_id = books.id
      LEFT JOIN collections ON collections.id = bookscollections.collection_id
    WHERE books.title LIKE ?
    ORDER BY author_alias,
      series_name,
      indexVolume,
      collection_name
    LIMIT ?
    OFFSET ?
  `, [alteredTitle, limit, offset]);
}

export async function findByAuthor(alias: string, limit: number, offset: number): Promise<any[]> {
  const alteredAuthor = `%${alias}%`
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name,
      collections.color_code AS color_code
    FROM authors
      LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
      LEFT JOIN books ON booksauthors.book_id = books.id
      LEFT JOIN booksseries ON booksseries.book_id = books.id
      LEFT JOIN series ON series.id = booksseries.series_id
      LEFT JOIN bookscollections ON bookscollections.book_id = books.id
      LEFT JOIN collections ON collections.id = bookscollections.collection_id
    WHERE authors.alias LIKE ?
    ORDER BY author_alias,
      series_name,
      indexVolume,
      collection_name
    LIMIT ?
    OFFSET ?
  `, [alteredAuthor, limit, offset]);
}

export async function findByCollection(name: string, limit: number, offset: number): Promise<any[]> {
  const alteredCollection = `%${name}%`
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name,
      collections.color_code AS color_code
    FROM authors
      LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
      LEFT JOIN books ON booksauthors.book_id = books.id
      LEFT JOIN booksseries ON booksseries.book_id = books.id
      LEFT JOIN series ON series.id = booksseries.series_id
      LEFT JOIN bookscollections ON bookscollections.book_id = books.id
      LEFT JOIN collections ON collections.id = bookscollections.collection_id
    WHERE collections.name LIKE ?
    ORDER BY author_alias,
      series_name,
      indexVolume,
      collection_name
    LIMIT ?
    OFFSET ?
  `, [alteredCollection, limit, offset]);
}

export async function findBySeries(name: string, limit: number, offset: number): Promise<any[]> {
  const alteredSeries = `%${name}%`
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
      booksauthors.cover_url AS cover,
      booksauthors.cloudinary_public_id AS cloudinaryId,
      books.language AS language,
      books.format AS format,
      series.name AS series_name,
      booksseries.index_series AS indexVolume,
      series.total_vol AS volumes,
      series.status AS status,
      collections.name AS collection_name,
      collections.color_code AS color_code
    FROM authors
      LEFT JOIN booksauthors ON authors.id = booksauthors.author_id
      LEFT JOIN books ON booksauthors.book_id = books.id
      LEFT JOIN booksseries ON booksseries.book_id = books.id
      LEFT JOIN series ON series.id = booksseries.series_id
      LEFT JOIN bookscollections ON bookscollections.book_id = books.id
      LEFT JOIN collections ON collections.id = bookscollections.collection_id
    WHERE series.name LIKE ?
    ORDER BY author_alias,
      series_name,
      indexVolume,
      collection_name
    LIMIT ?
    OFFSET ?
  `, [alteredSeries, limit, offset]);
}
