import type { Roles } from "../types/utils.model.js"

export type UserDTO = {
  name: string,
  lastname1: string,
  lastname2: string,
  email: string,
  password: string,
  role: Roles
}