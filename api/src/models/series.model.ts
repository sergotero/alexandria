import type { States } from "./../types/models.types.js";

export default interface Series{
  id?: number | null;
  name: string | null;
  volumes: number | null;
  status: States | null;
}