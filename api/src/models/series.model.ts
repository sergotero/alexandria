class Series{
  private _states: string[] = ["Abierta", "Cerrada", "Desconocido"];

  private _id?: number;
  private _name: string;
  private _volumes?: number;
  private _status!: string;

  constructor(name: string, status: string, volumes?: number) {
    this._name = name;
    this.status = status;
    if (typeof volumes === "number") {
      this._volumes = volumes;
    }
  }

  //Getters
  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get volumes(): number | undefined {
    return this._volumes;
  }

  get status(): string | undefined {
    return this._status;
  }

  //Setters
  set name(newName: string) {
    this._name = newName;
  }

  set volumes(newVols: number) {
    this._volumes = newVols;
  }

  set status(newStatus: string) {
    if (this._states.includes(newStatus)){
      const firstLetter: string = newStatus.slice(0,1).toUpperCase();
      const restLetters: string = newStatus.slice(1).toLowerCase();
      const status: string = firstLetter + restLetters;
      this._status = status;
    }
  }

}

export default Series;