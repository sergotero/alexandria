import type { States } from "../types/utils.model.js";

export type SeriesDTO = {
  name?: string | null;
  volumes?: number | null;
  status?: States | null;
}