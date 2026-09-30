import type { ApiError } from "@shared/types";

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "success" in error &&
    error.success === false &&
    "error" in error
  );
}

export function dateFormatter(date?: Date | string | null, universal: boolean = false): string {
  if (!date) {
    return "";
  } 
  const newDate = new Date(date);
  if (isNaN(newDate.getTime())) {
    return "";
  }
  
  //El locale "en-CA" (inglés de Canadá) es el único estándar regional extendido que formatea las fechas oficialmente siguiendo la norma ISO 8601 (YYYY-MM-DD)
  if (universal) {
    return newDate.toLocaleDateString("en-CA"); // 'YYYY-MM-DD' format
  } else {
    return newDate.toLocaleDateString("es-ES"); // Formato 'DD-MM-YYYY'
  }
};