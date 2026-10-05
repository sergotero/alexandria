import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FullBook } from "@shared/types";
import PopUpModal from "./popup-modal";

function BookCard({ bookBase, author, collection }: FullBook) {
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
            id={"delete-warning"}
            text={<FontAwesomeIcon icon={"xmark"} />}
            color={"none"}
            backgroundColor={"#c50a2a"}
            className={"flex ms-auto p-1"}
          >
            <div>
                <p className="text-white text-center">¿Está seguro de que desea eliminar el libro?</p>
                <div className="flex justify-center gap-3 mt-4">
                  <button className="bg-red-800 hover:bg-red-600 hover:cursor-pointer text-white min-w-24 rounded-md pe-2 disabled:bg-zinc-600 disabled:cursor-default ps-2 transition-opacity duration-300">Borrar</button>
                  <button className="bg-zinc-600 hover:bg-zinc-400 hover:cursor-pointer text-white min-w-24 rounded-md pe-2 disabled:bg-zinc-600 disabled:cursor-default ps-2 transition-opacity duration-300">Cerrar</button>
                </div>
              </div>
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