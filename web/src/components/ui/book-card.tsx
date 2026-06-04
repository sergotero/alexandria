import type { FullBook } from "@shared/types";

function BookCard({ bookBase, author, collection }: FullBook) {
  return(
    <>
      <h5 className={`font-bold text-md`}>{bookBase.title}</h5>
      <h6 className={`font-light text-md italic`}>{author.alias}</h6>
      <span className={`block self-end mt-auto min-w-25 text-center bg-emerald-700 p-1 m-1 rounded-md text-sm`}>{collection.name}</span>
    </>
  );
}

export default BookCard;