import type { FullBook } from "@shared/types";
import BookCard from "./book-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          className="flex flex-col relative bg-zinc-700 text-white p-2 rounded-xl hover:bg-zinc-600"
          key={`B${book.bookBase.id}-A${book.author.id}`}
          onClick={() => handleDetails(book)}>
            <BookCard {...book} />
          {book.review.id !== null && (
            <div className="absolute -top-1 left-0">
              <FontAwesomeIcon icon={"bookmark"} color={book.collection.colorCode} fontSize={30}/>
            </div>
          )}
        </article>)
      })}
    </>
  );
}

export default BookCardsGenerator;