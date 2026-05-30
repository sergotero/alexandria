import type { FullBook } from "../../types/api-types";

function BookCard({ bookBase, author, collection }: FullBook) {
  return(
    <>
      <span className={`block self-end bg-emerald-700 p-1 m-1 rounded-md text-sm`}>{collection.name}</span>
      <h5 className={`font-bold text-md`}>{bookBase.title}</h5>
      <h6 className={`font-light text-md italic`}>{author.alias}</h6>
      {/* <p className={``}>{bookBase?.description?.slice(0,140) ?? "No disponible"}</p> */}
    </>
  );
}

export default BookCard;