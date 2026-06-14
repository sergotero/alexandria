import type { Formats, Languages } from "../types/utils.model.js";

export type BookBaseDTO = {
  title: string,
  language: Languages,
  format: Formats,
  description?: string,
  indexVolume?: number,
  cover?: string,
  cloudinaryId?: string
}