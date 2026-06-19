export type ReadBook = {
  readonly id: number,
  bookId: number,
  title: string,
  authorId: number,
  author: string
  readingDate: Date,
  score: number,
  comments: string | null,
  completed: boolean | null
}