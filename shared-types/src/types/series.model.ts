import type { States } from "./utils.model.js";

export type Series = {
  readonly id: number | null;
  name: string | null;
  volumes: number | null;
  status: States | null;
}