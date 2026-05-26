import type { Roles } from "../types/models.types.js";

export default interface User{
  id?: number,
  name: string,
  lastname1?: string | null,
  lastname2?: string | null,
  email: string,
  password: string,
  role: Roles
}