import type { Formats, Languages } from "../types/utils.model.js"

export type FullBookDTO = {
  title: string,
  language: Languages,
  format: Formats,
  description?: string,
  indexVolume?: number,
  cover?: string,
  cloudinaryId?: string,
  authorId: number,
  seriesId?: number,
  collectionId: number
}