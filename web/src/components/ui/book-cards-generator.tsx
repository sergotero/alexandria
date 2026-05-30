import type { FullBook } from "../../types/api-types";
import BookCard from "./book-card";

type BookCardsGeneratorProps = {
  fullBooks: FullBook[]
};

function BookCardsGenerator({ fullBooks }: BookCardsGeneratorProps) {

  return(
    <>
      {fullBooks.map((book: FullBook) => {
        return (
        <article className="flex flex-col bg-zinc-800 text-white p-2 rounded-xl" id={`B${book.bookBase.id}-A${book.author.id}`} key={`B${book.bookBase.id}-A${book.author.id}`}>
          <BookCard {...book} />
        </article>)
      })}
    </>
  );
}

export default BookCardsGenerator;