import type { FullBook, ServerMessage } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as BasebookServices from "./../../../services/basebook.services.js";
import * as BooksAuthorsServices from "./../../../services/booksauthors.services.js";
import * as BooksSeriesServices from "./../../../services/booksseries.services.js";
import * as BooksCollectionsServices from "./../../../services/bookscollections.services.js";
import * as ReadbookServices from "./../../../services/readbook.services.js";
import { isApiError } from "../../../services/utils.services";
import { useEffect } from "react";

type DeleteFormProps = {
  fullbook: FullBook,
  warning: ServerMessage | null,
  setWarning: (data: ServerMessage | null) => void,
};

function DeleteForm({ fullbook, warning, setWarning }: DeleteFormProps){
  
  "use no memo";

  const { handleSubmit, register } = useForm<any>();
  
  const submit: SubmitHandler<any> = async(data: any) => {
    console.log(data);
    try {
      if (data.bookId !== undefined && data.bookId !== null) {

        // await BooksAuthorsServices.destroy({bookId: data.bookId, authorId: data.authorId});
        if (!isNaN(data.seriesId) && data.seriesId !== undefined && data.seriesId !== null) {
          // await BooksSeriesServices.destroy({bookId: data.bookId, seriesId: data.seriesId});
        }
        // await BooksCollectionsServices.destroy({bookId: data.bookId, collectionId: data.collectionId});
        if (!isNaN(data.reviewId) && data.reviewId !== undefined && data.reviewId !== null) {
          // await BasebookServices.destroy(data.bookId);
        }
      }
      
      setWarning({
        success: true,
        data: {
          message: "El libro se ha eliminado con éxito",
          statusCode: 200
        }
      });
      const dialog = document.getElementById(`delete-warning${fullbook.bookBase.id}`) as HTMLDialogElement;
      dialog.hidePopover();
    } catch (error: unknown) {
      if(isApiError(error)){
        setWarning({
          success: error.success,
          data: {
            message: error.error.message,
            statusCode: error.error.statusCode
          }
        });
      }
    }
  }

  useEffect(() => {
    let warningTimeout: number;
    if (warning) {
      warningTimeout = setTimeout(() => {
        setWarning(null);
      }, 5000);
    }
    return () => {
      clearTimeout(warningTimeout);
    }
  }, [warning]);

  return (
    <form method="popover" onSubmit={handleSubmit(submit)}>
      <input 
        {...register("bookId",{ valueAsNumber: true})}
        type="number"
        value={fullbook.bookBase.id} 
        hidden/>
      <input 
        {...register("authorId",{ valueAsNumber: true})} 
        type="number" 
        value={fullbook.author.id} 
        hidden/>
      <input 
        {...register("seriesId",{ valueAsNumber: true})} 
        type="number" 
        value={fullbook?.series?.id ?? undefined} 
        hidden/>
      <input 
        {...register("collectionId",{ valueAsNumber: true})} 
        type="number" 
        value={fullbook.collection.id} 
        hidden/>
      <input 
        {...register("reviewId",{ valueAsNumber: true})} 
        type="number" 
        value={fullbook?.review?.id ?? undefined} 
        hidden/>

      <p className="text-white text-center text-xl mb-3">
        <b>¿Está seguro de que desea eliminar el libro?</b> <br />
      </p>
      <p className="text-center text-red-500 mb-3">
        <i>{fullbook.bookBase.title} - {fullbook.author.alias}</i>
      </p>
      <p className="text-white text-center">
        Una vez que los cambios se lleven a cabo, los datos que hayan sido borrados no se podrán recuperar.
      </p>
      <div className="flex justify-center gap-3 mt-4">
        <button 
          className="bg-red-800 hover:bg-red-600 hover:cursor-pointer text-white min-w-24 rounded-md pe-2 disabled:bg-zinc-600 disabled:cursor-default ps-2 transition-opacity duration-300">
            Borrar
        </button>
        <button 
          className="bg-zinc-600 hover:bg-zinc-400 hover:cursor-pointer text-white min-w-24 rounded-md pe-2 disabled:bg-zinc-600 disabled:cursor-default ps-2 transition-opacity duration-300"
          onClick={(event: React.MouseEvent) => {
            event.preventDefault();
            const dialog = document.getElementById(`delete-warning${fullbook.bookBase.id}`) as HTMLDialogElement;
            dialog.hidePopover();
          }}>
            Cerrar
        </button>
      </div>
    </form>
  );
}

export default DeleteForm;