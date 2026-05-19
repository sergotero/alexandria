export default interface ReadBook{
  id?: number,
  bookId: number,
  authorId: number,
  readingDate: Date,
  score: number,
  comments: string | null
}