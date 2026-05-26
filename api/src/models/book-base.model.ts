import type { Formats, Languages } from "../types/models.types.js";

export default interface BookBase{
  id?: number,
  title: string,
  language: Languages,
  format: Formats,
  description?: string | null,
  indexVolume?: number | null,
  cover?: string | null
}