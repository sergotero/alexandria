import type { Roles } from "./utils.model.js"

export type User = {
  readonly id: number,
  name: string,
  lastname1: string,
  lastname2: string,
  email: string,
  password: string,
  role: Roles
}