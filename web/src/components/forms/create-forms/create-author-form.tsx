import type { AuthorDTO, ServerMessage } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as AuthorServices from "./../../../services/author.services.js";
import { isApiError } from "../../../services/utils.services";
import { useEffect } from "react";

type CreateAuthorFormProps = {
  warning: ServerMessage | null,
  setWarning: (error: ServerMessage | null) => void
}

function CreateAuthorForm({ warning, setWarning }: CreateAuthorFormProps) {
  
  "use no memo";
  
    const{ register, handleSubmit, reset } = useForm<AuthorDTO>();
  
    const submit: SubmitHandler<AuthorDTO> = async (data: AuthorDTO) => {
      try {
        await AuthorServices.create(data);
        setWarning({
          success: true,
          data: {
            message: "El autor se ha creado con éxito",
            statusCode: 200
          }
        });
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
          <legend className="text-white">&nbsp;Nuevo autor&nbsp;</legend>
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
            <label htmlFor="lastname1" className="text-white">Apellido 1</label>
            <input 
              {...register("lastname1")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname1"/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname2" className="text-white">Apellido 2</label>
            <input 
              {...register("lastname2")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname2"/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname3" className="text-white">Apellido 3</label>
            <input 
              {...register("lastname3")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname3"/>
          </div>

          <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
            Crear
          </button>
          <p className="inline ms-15 text-white text-center text-xs">Los campos marcados con * son obligatorios</p>
        </fieldset>
      </form>
  );
}

export default CreateAuthorForm;