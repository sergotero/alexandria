export type ReadBookDTO = {
  bookId: number,
  authorId: number,
  readingDate: Date,
  score: number,
  comments?: string | null
}