export default interface Author{
  readonly id?: number;
  name: string;
  lastname1?: string | null;
  lastname2?: string | null;
  lastname3?: string | null;
  alias?: string;
}