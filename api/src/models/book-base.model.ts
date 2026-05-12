export type Languages = "Español" | "Inglés" | "Alemán" | "Japonés";
export type Formats = "Digital" | "Impreso" | "Ambos";

export default interface BookBase{
  id?: number;
  title: string;
  language: Languages;
  format: Formats;
  description?: string | null;
  indexVolume?: number | null;
}