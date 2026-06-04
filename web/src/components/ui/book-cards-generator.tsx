import type { FullBook } from "@shared/types";
import BookCard from "./book-card";

type BookCardsGeneratorProps = {
  fullBooks: FullBook[],
  handleDetails: (fullBook: FullBook) => void
};

function BookCardsGenerator({ fullBooks, handleDetails }: BookCardsGeneratorProps) {

  return(
    <>
      {fullBooks.map((book: FullBook) => {
        return (
        <article
          className="flex flex-col bg-zinc-700 text-white p-2 rounded-xl hover:bg-zinc-600"
          key={`B${book.bookBase.id}-A${book.author.id}`}
          onClick={() => handleDetails(book)}>
            <BookCard {...book} />
        </article>)
      })}
    </>
  );
}

export default BookCardsGenerator;