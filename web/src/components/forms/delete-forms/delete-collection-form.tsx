import type { Collection } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as CollectionServices from "./../../../services/collection.services.js";
import { isApiError } from "../../../services/utils.services";
import { useEffect } from "react";
import useWarningContext from "../../hooks/useWarningContext.js";

type DeleteCollectionFormProps = {
  collectionList: Collection[],
};

function DeleteCollectionForm({ collectionList }: DeleteCollectionFormProps) {
  "use no memo";

  const { handleSubmit, register } = useForm<any>();
  const { warning, setWarning, update, setUpdate } = useWarningContext();
  
  const submit: SubmitHandler<number> = async(data: number) => {
    console.log("data: ", data);
    
    try {
    //   if (data.bookId !== undefined && data.bookId !== null) {
    //     await CollectionServices.destroy(data.authorId);
    //   }
    //   setWarning({
    //     success: true,
    //     data: {
    //       message: "El libro se ha eliminado con éxito",
    //       statusCode: 200
    //     }
    //   });
      const dialog = document.getElementById(`del-collections`) as HTMLDialogElement;
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
      <fieldset className="text-white">
        <legend>&nbsp;Colección&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="collectionId">Colección</label>
          <select 
            {...register("collectionId",{ valueAsNumber: true})}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="collectionId"
          >
            {collectionList.map((col) => (<option key={col.id} value={col.id}>{col.name}</option>))}
          </select>
        </div>
        </fieldset>

      <p className="text-white text-center text-xl mb-3">
        <b>¿Está seguro de que desea eliminar la colección?</b> <br />
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
            const dialog = document.getElementById(`del-collections`) as HTMLDialogElement;
            dialog.hidePopover();
          }}>
            Cerrar
        </button>
      </div>
    </form>
  );
}

export default DeleteCollectionForm;