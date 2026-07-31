import type { FullBook } from "@shared/types";

type BookDetails = {
  book: FullBook | null
}

function BookDetails({ book }: BookDetails) {
  return (
    <>
      {book && (
        <div className="flex flex-wrap items-center">
          {/* TITLE */}
          <h2 className="block w-100 text-4xl font-bold text-center">{book.bookBase.title}</h2>
          {/* AUTHOR */}
          <h2 className="block w-100 text-xl font-light text-center italic">{book.author.alias}</h2>
          {/* IMAGE & TABLE */}
          <div className="flex flex-wrap">
            <div className="w-[70%] m-auto pt-5 pb-5">
              <img
                className="object-cover"
                src={book.bookBase.cover ? book.bookBase.cover : "https://res.cloudinary.com/da8iuexu4/image/upload/v1783292999/404-cover_y3yscb.png"}
                alt={book.bookBase.title}
              />
            </div>
            <div className="m-auto mb-5">
              <table>
                <tbody>
                  <tr>
                    <td>Serie</td>
                    <td>{book.series?.name ?? " - "}</td>
                  </tr>
                  <tr>
                    <td>Volúmenes</td>
                    <td>{book.series?.volumes ?? " - "}</td>
                  </tr>
                  <tr>
                    <td>#</td>
                    <td>{book.bookBase.indexVolume ?? " - "}</td>
                  </tr>
                  <tr>
                    <td>Colección</td>
                    <td>{book.collection.name ?? " - "}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* DESCRIPTION */}
          <p className="text-justify">{book.bookBase.description ?? "Descripción no disponible"}</p>
        </div>
      )}
    </>
  );
}

export default BookDetails;