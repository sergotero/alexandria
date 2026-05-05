import Author from "../models/author.model.js";
import BookBase from "../models/book-base.model.js";
import Series from "../models/series.model.js";
import Collection from "../models/collection.model.js";
import FullBook from "../models/full-book.model.js";

type BookData = Author | BookBase | Series | Collection | FullBook;

export default interface BaseRepositoryInterface {
  create(data: BookData): Promise<BookData>;
  findAll(): Promise<BookData>;
  findById(id: number): Promise<BookData>;
  findByIdAndUpdate(id: number): Promise<BookData>;
  findByIdAndDelete(id: number): Promise<BookData>;
}