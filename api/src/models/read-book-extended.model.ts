import type ReadBook from "./read-book.model.js";

export default interface ReadBookExtended extends ReadBook{
  title: string,
  author: string
}