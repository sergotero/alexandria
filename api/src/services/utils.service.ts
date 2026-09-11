import type { Author, BookBase, Collection, FullBook, Series } from '@shared/types';
import bcrypt from "bcryptjs";

export function capitalize(word: string | null): string | null {
  if (word === null || word === undefined) {
    return null;
  } else {
    const firstLetter: string = word.slice(0,1).toUpperCase();
    const restLetters: string = word.slice(1).toLowerCase();
    return firstLetter + restLetters;
  }
}

export async function encryptPassword(pass: string, num: number = 10): Promise<string> {
  const salt = await bcrypt.genSalt(num);
  const hashedPass = await bcrypt.hash(pass, salt);
  return hashedPass;
}

export async function checkPassword(pass: string, hash: string): Promise<boolean> {
  const check = bcrypt.compare(pass, hash);
  return check;
}

export function fullBookGenerator(book: any): FullBook{
  const bookBase: BookBase = {
    id: book.book_id,
    title: book.title,
    language: book.language,
    format: book.format,
    description: book.description,
    indexVolume: book.indexVolume,
    cover: book.cover,
    cloudinaryId: book.cloudinaryId
  };
  
  const author: Author = {
    id: book.author_id,
    name: book.author_name,
    lastname1: book.author_lastname1,
    lastname2: book.author_lastname2,
    lastname3: book.author_lastname3,
    alias: book.author_alias
  };

  const series: Series = {
    id: book.series_id,
    name: book.series_name,
    volumes: book.volumes,
    status: book.status
  };

  const collection: Collection = {
    id: book.collection_id,
    name: book.collection_name
  }

  return {
    bookBase,
    author,
    series,
    collection
  } as FullBook;
}