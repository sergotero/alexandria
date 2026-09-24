import type { CollectionDTO, ServerMessage } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as CollectionServices from "../../../services/collection.services.js";
import { isApiError } from "../../../services/utils.services.js";
import { useEffect } from "react";

type CreateCollectionFormProp = {
  warning: ServerMessage | null,
  setWarning: (newWarning: ServerMessage | null) => void
};

function CreateCollectionForm({ warning, setWarning }: CreateCollectionFormProp){
  
  "use no memo";

  const{ register, handleSubmit, reset } = useForm<CollectionDTO>();

  const submit: SubmitHandler<CollectionDTO> = async (data: CollectionDTO) => {
    try {
      await CollectionServices.create(data);
      setWarning({
        success: true,
        data: {
          message: "La colección se ha creado con éxito",
          statusCode: 200
        }
      })
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
    reset();
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
      <fieldset>
        <legend className="text-white">&nbsp;Nueva colección&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="name" className="text-white">Nombre*</label>
          <input 
            {...register("name", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="name"/>
        </div>

        <div className="input-group">
          <label htmlFor="color-code" className="text-white">Color etiqueta*</label>
          <input 
            {...register("colorCode", {
              required: true
            })}
            defaultValue={"#000000"}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="color"
            id="color-code"/>
        </div>

        <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
          Crear
        </button>
        <p className="inline ms-15 text-white text-center text-xs">Los campos marcados con * son obligatorios</p>
      </fieldset>
    </form>
  )
}

export default CreateCollectionForm;