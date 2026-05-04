class Author{
  
  private _id?: number;
  private _name: string;
  private _lastName1?: string;
  private _lastName2?: string;
  private _lastName3?: string;
  private _alias: string = "";

  constructor(name: string, lastName1?: string, lastName2?: string, lastName3?: string) {
    this._name = name.trim();
    
    if (typeof lastName1 === "string") {
      this._lastName1 = lastName1.trim();
    }

    if (typeof lastName2 === "string") {
      this._lastName2 = lastName2.trim();
    }

    if (typeof lastName3 === "string") {
      this._lastName3 = lastName3.trim();
    }

    this.alias = this.createAlias();
  }

  //Getters
  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get lastName1(): string | undefined {
    return this._lastName1;
  }

  get lastName2(): string | undefined {
    return this._lastName2;
  }

  get lastName3(): string | undefined {
    return this._lastName3;
  }

  get alias(): string {
    return this._alias;
  }

  //Setters
  private set id(newId: number) {
    this._id = newId;
  }

  set name(newName: string) {
    this._name = newName.trim();
  }

  set lastName1(newLastName: string) {
    this._lastName1 = newLastName.trim();
  }

  set lastName2(newLastName: string) {
    this._lastName2 = newLastName.trim();
  }

  set lastName3(newLastName: string) {
    this._lastName3 = newLastName.trim();
  }

  set alias(newAlias: string) {
    this._alias = newAlias.trim();
  }

  createAlias(): string{
    return `${this._name} ${this._lastName1 ?? ""} ${this._lastName2 ?? ""} ${this._lastName3 ?? ""}`.trim();
  }
}

export default Author;