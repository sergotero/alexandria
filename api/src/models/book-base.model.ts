type Languages = "Español" | "Inglés" | "Alemán" | "Japonés";
type Formats = "Digital" | "Impreso" | "Ambos";

export default interface BookBase{
  readonly id?: number;
  title: string;
  language: Languages;
  format: Formats;
  description?: string;
  indexVolume?: number;
}