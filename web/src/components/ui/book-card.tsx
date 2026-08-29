import type { FullBook } from "@shared/types";

function BookCard({ bookBase, author, collection }: FullBook) {
  return(
    <div className="flex gap-2">
      <div className="w-[30%]">
        <img
          className="object-cover rounded-md"
          src={bookBase.cover ? bookBase.cover : "https://res.cloudinary.com/da8iuexu4/image/upload/v1783292999/404-cover_y3yscb.png"}
          alt={bookBase.title}
        />
      </div>
      <div className="w-[70%] flex flex-col">
        <h6 
          className={`font-bold text-sm`}>
            {bookBase.title.length >= 50 ? bookBase.title.slice(0, 50) + "..." : bookBase.title}
        </h6>
        <p 
          className={`font-light text-sm italic`}>
            {author.alias}
        </p>
        <span className={`block self-end mt-auto min-w-25 text-center bg-emerald-700 p-1 m-1 rounded-md text-sm`}>{collection.name}</span>
      </div>
    </div>
  );
}

export default BookCard;