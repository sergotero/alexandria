import type { Author } from "./author.model.js";
import type { BookBase } from "./book-base.model.js";
import type { Collection } from "./collection.model.js";
import type { Series } from "./series.model.js";

export type FullBook = {
  bookBase: BookBase;
  author: Author;
  series?: Series;
  collection: Collection;
}