import type { Formats, Languages } from "../types/utils.model.js";

export type BookBaseDTO = {
  title: string,
  language: Languages,
  format: Formats,
  description?: string | null,
  indexVolume?: number | null,
  cover?: string | null,
  cloudinaryId?: string | null
}