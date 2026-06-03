import type { FullBook } from "../../../../shared/types/api-types";

type BookDetails = {
  book: FullBook | null
}

function BookDetails({ book }: BookDetails) {
  return(
    <>
    {book && (
      <div className="flex flex-col">
        <div>
          <img src={book.bookBase.cover ?? ""} alt={book.bookBase.title} />
        </div>
        <h2 className="text-4xl font-bold">{book.bookBase.title}</h2>
        <h2 className="text-xl font-light italic">{book.author.alias}</h2>
        <br />
        <p className="text-justify">{book.bookBase.description ?? "Descripción no disponible"}</p>
        <br />

        {/* <table className="table-auto border-collapse">
          <tbody className="border-1 border-gray-400 p-1.5">
            <tr className="border-1 border-gray-400 p-1.5">
              <td className="border-1 border-gray-400 p-1.5">Título</td>
              <td className="border-1 border-gray-400 p-1.5">{book.bookBase.title}</td>
            </tr>
            <tr className="border-1 border-gray-400 p-1.5">
              <td className="border-1 border-gray-400 p-1.5">Autor</td>
              <td className="border-1 border-gray-400 p-1.5">{book.author.alias}</td>
            </tr>
            <tr className="border-1 border-gray-400 p-1.5">
              <td className="border-1 border-gray-400 p-1.5">Serie</td>
              <td className="border-1 border-gray-400 p-1.5">{book.series?.name ?? "-"}</td>
            </tr>
            <tr className="border-1 border-gray-400 p-1.5">
              <td className="border-1 border-gray-400 p-1.5">Volumen</td>
              <td className="border-1 border-gray-400 p-1.5">{book.bookBase.indexVolume ?? "-"}</td>
            </tr>
            <tr className="border-1 border-gray-400 p-1.5">
              <td className="border-1 border-gray-400 p-1.5">Colección</td>
              <td className="border-1 border-gray-400 p-1.5">{book.collection.name}</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    )}
    </>
  );
}

export default BookDetails;