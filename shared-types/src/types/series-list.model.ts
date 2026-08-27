import type { States } from "./utils.model.js";

export type SeriesList = {
  readonly id: number;
  name: string;
  volumes: number;
  status: States;
}