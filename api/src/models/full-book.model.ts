import BookBase from "./book-base.model.js";
import Author from "./author.model.js";
import Series from "./series.model.js";
import Collection from "./collection.model.js";

class FullBook{
  private _bookBase: BookBase;
  private _author: Author;
  private _series?: Series;
  private _collection: Collection;

  constructor(bookBase: BookBase, author: Author, collection: Collection, series?: Series,){
    this._bookBase= bookBase;
    this._author = author;
    this._collection = collection;
    if (series instanceof Series) {
      this._series = series;
    }
  }

  //Getters
  get bookBase(): BookBase {
    return this._bookBase;
  }

  get author(): Author {
    return this._author;
  }

  get series(): Series | undefined {
    return this._series;
  }

  get collection(): Collection {
    return this._collection;
  }

  //Setters
  set bookBase(newBase: BookBase) {
    this._bookBase = newBase;
  }

  set author(newAuthor: Author) {
    this._author = newAuthor;
  }

  set series(newSeries: Series) {
    this._series = newSeries;
  }

  set collection(newCollection: Collection) {
    this._collection = newCollection;
  }

}

export default FullBook;