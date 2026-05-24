export type SQLValue = string| number| boolean| Date| null;
export type States = "Abierta" | "Cerrada" | "Desconocido";
export type Languages = "Español" | "Inglés" | "Alemán" | "Japonés";
export type Formats = "Digital" | "Impreso" | "Ambos";

type ApiSuccess<T> = {
  success: true;
  data: T;
};

type ApiError = {
  success: false;
  error: {
    message: string;
    statusCode: number;
  };
};

export type APIResponse<T> = ApiSuccess<T> | ApiError;

export type Author = {
  id?: number;
  name: string;
  lastname1?: string | null;
  lastname2?: string | null;
  lastname3?: string | null;
  alias?: string;
}

export type BookBase = {
  id?: number;
  title: string;
  language: Languages;
  format: Formats;
  description?: string | null;
  indexVolume?: number | null;
}

export type Collection = {
  id?: number;
  name: string;
}

export type Series = {
  id?: number | null;
  name: string | null;
  volumes: number | null;
  status: States | null;
}

export type FullBook = {
  bookBase: BookBase;
  author: Author;
  series?: Series;
  collection: Collection;
}

export type ReadBook = {
  id?: number,
  bookId: number,
  authorId: number,
  readingDate: Date,
  score: number,
  comments: string | null
}

export type ReadBookExtended = ReadBook & {
  title: string,
  author: string
}