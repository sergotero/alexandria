import type { Author } from "../types/author.model.js";
import type { BookBase } from "../types/book-base.model.js";
import type { Collection } from "../types/collection.model.js";
import type { Series } from "../types/series.model.js";


export type FullBookDTO = {
  bookBase: BookBase;
  author: Author;
  series?: Series;
  collection: Collection;
}