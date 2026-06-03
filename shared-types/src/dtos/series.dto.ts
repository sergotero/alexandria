import type { States } from "../types/utils.model.js";

export type SeriesDTO = {
  name?: string;
  volumes?: number;
  status?: States;
}