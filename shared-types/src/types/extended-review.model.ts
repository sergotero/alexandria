export type ExtendedReview = {
  readonly id: number,
  readonly bookId: number,
  readonly authorId: number,
  readonly title: string,
  readonly author: string,
  readingDate: Date,
  score: number,
  comments: string,
  completed: boolean
};