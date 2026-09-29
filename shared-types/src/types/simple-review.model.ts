export type SimpleReview = {
  readonly id: number | null,
  readingDate: Date | null,
  score: number | null,
  comments: string | null,
  completed: boolean | null
};