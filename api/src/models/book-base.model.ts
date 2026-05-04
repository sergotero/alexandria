class BookBase{
  
  private _formats: string[] = ["Digital", "Impreso", "Ambos"];
  private _languages: string[] = ["Español", "Inglés", "Alemán", "Japonés"];

  protected _id?: number;
  protected _title: string;
  protected _language: string;
  protected _format: string;
  protected _description?: string;
  protected _indexVolume?: number;

  constructor(title: string, language: string, format: string, description?: string, indexVolume?: number) {
    this._title = title;
    this._language = language;
    this._format = format;

    if (typeof description === "string") {
      this._description = description;
    }

    if (typeof indexVolume === "number") {
      this._indexVolume = indexVolume;
    }
  }

  //Getters
  get id(): number | undefined {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get language(): string {
    return this._language;
  }

  get format(): string {
    return this._format;
  }

  get description(): string | undefined {
    return this._description;
  }

  get indexVolume(): number | undefined {
    return this._indexVolume;
  }

  //Setters
  private set id(newId: number) {
    this._id = newId;
  }

  set title(newTitle: string) {
    this._title = newTitle;
  }

  set language(newLang: string) {
    if (this._languages.includes(newLang)) {
      const firstLetter: string = newLang.slice(0,1).toUpperCase();
      const restLetters: string = newLang.slice(1).toLowerCase();
      const language = firstLetter + restLetters;
      this._language = language;
    } else {
      throw new Error();
    }
  }

  set format(newFormat: string) {
    if (this._formats.includes(newFormat)) {
      const firstLetter: string = newFormat.slice(0,1).toUpperCase();
      const restLetters: string = newFormat.slice(1).toLowerCase();
      const format = firstLetter + restLetters;
      this._format = format;
    } else {
      throw new Error();
    }
  }

  set description(newDescription: string) {
    this._description = newDescription;
  }

  set indexVolume(newIndexVolume: number) {
    this._indexVolume = newIndexVolume;
  }
}

export default BookBase;