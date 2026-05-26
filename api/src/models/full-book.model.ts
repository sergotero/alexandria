import type BookBase from "./book-base.model.js";
import type Author from "./author.model.js";
import type Series from "./series.model.js";
import type Collection from "./collection.model.js";

export default interface FullBook{
  bookBase: BookBase,
  author: Author,
  series?: Series,
  collection: Collection,
}