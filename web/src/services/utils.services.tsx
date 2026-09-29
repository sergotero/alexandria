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

export function dateFormatter(data: Date): string {
  const date = new Date(data);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}