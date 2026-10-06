import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FullBook } from "@shared/types";
import PopUpModal from "./popup-modal";
import DeleteForm from "../forms/delete-forms/delete-form";

type BookCardProp = {
  fullbook: FullBook,
  setDetails: (data: FullBook | null) => void,
};

function BookCard({fullbook, setDetails}: BookCardProp) {
  const { bookBase, author, collection } = fullbook;
  return(
    <div className="flex gap-2">
      <div className="w-[30%]">
        <img
          className="covers object-fill rounded-md"
          src={
            bookBase.cover ? 
            bookBase.cover : 
            "https://res.cloudinary.com/da8iuexu4/image/upload/v1783292999/404-cover_y3yscb.png"
          }
          alt={bookBase.title}
        />
      </div>
      <div className="w-[70%] flex flex-col">
        <div className="flex">
          <h6 className={`font-bold text-sm`}>
              {
                bookBase.title.length >= 50 ?
                bookBase.title.slice(0, 50) + "..." :
                bookBase.title
              }
          </h6>
          <PopUpModal 
            id={`delete-warning${bookBase.id}`}
            text={<FontAwesomeIcon icon={"xmark"} />}
            color={"none"}
            backgroundColor={"#c50a2a"}
            className={"flex ms-auto p-1"}
          >
            <DeleteForm 
              fullbook={fullbook}
              setDetails={setDetails}
            />
          </PopUpModal>
        </div>
        <p className={`font-light text-sm italic`}>
            {author.alias}
        </p>
        <div className="flex mt-auto">
          <div 
            className={`ms-auto mt-auto min-w-[50%] max-w-[70%] text-center p-1 rounded-md text-sm`}
            style={{ backgroundColor: collection.colorCode }}>
              {collection.name}
            </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;