import type { Formats, Languages } from "./utils.model.js";

export type BookBase = {
  readonly id: number,
  title: string,
  language: Languages,
  format: Formats,
  description: string | null,
  indexVolume: number | null,
  cover: string | null
}