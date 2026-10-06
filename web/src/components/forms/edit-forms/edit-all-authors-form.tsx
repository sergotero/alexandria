import type { Author } from "@shared/types";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as AuthorServices from "../../../services/author.services.js";
import { isApiError } from "../../../services/utils.services.js";
import useWarningContext from "../../hooks/useWarningContext.js";

type EditAllAuthorsFormProps = {
  authorList: Author[],
  setAuthorList: (data: Author[]) => void,
};

function EditAllAuthorsForm({ authorList, setAuthorList }: EditAllAuthorsFormProps){

  "use no memo";

  const { register, reset, handleSubmit } = useForm<Author>();
  const [ selectedAuthor, setSelectedAuthor ] = useState<Author | null>(null);
  const { warning, setWarning } = useWarningContext();
  
    useEffect(() => {
      reset({
        id: selectedAuthor?.id,
        name: selectedAuthor?.name,
        lastname1: selectedAuthor?.lastname1,
        lastname2: selectedAuthor?.lastname2,
        lastname3: selectedAuthor?.lastname3,
      });
    }, [reset, selectedAuthor]);
  
    const submit: SubmitHandler<Author> = async (data: Author) => {
      console.log("Data: ", data);
      
      try {
        await AuthorServices.update(data.id, data);
        setWarning({
          success: true,
          data: {
            message: "El autor se ha actualizado con éxito",
            statusCode: 200
          }
        });
        const authors = await AuthorServices.list();
        if (authors.success) {
          setAuthorList(authors.data);
        }
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
      <form method="POST" onSubmit={handleSubmit(submit)}>
        <fieldset className="text-white">
          <legend>&nbsp;Autores&nbsp;</legend>
          <div className="input-group">
            <label htmlFor="id">Autor</label>
            <select
              {...register("id", {
                required: true,
                valueAsNumber: true,
                onChange: async (event) => {
                  const id = +event.target.value;
                  const serie = await AuthorServices.detail(id);
                  if (serie.success) {
                    setSelectedAuthor(serie.data);
                  }
                }
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="id">
              {authorList.map((series) => (
                <option
                  key={series.id}
                  value={series.id}>
                    {series.alias}
                </option>
            ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="name">Nombre*</label>
            <input 
              {...register("name", {
                required: true,
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="name"
              defaultValue={selectedAuthor?.name}/>
          </div>
          
          <div className="input-group">
            <label htmlFor="lastname1">Apellido 1</label>
            <input 
              {...register("lastname1", {
                required: true,
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname1"
              defaultValue={selectedAuthor?.lastname1 ?? ""}/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname2">Apellido 2</label>
            <input 
              {...register("lastname2", {
                required: true,
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname2"
              defaultValue={selectedAuthor?.lastname2 ?? ""}/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname3">Apellido 3</label>
            <input 
              {...register("lastname3", {
                required: true,
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname3"
              defaultValue={selectedAuthor?.lastname3 ?? ""}/>
          </div>

          <button
            type="submit"
            className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
              Actualizar
          </button>
          <p className="inline ms-15 text-white text-center text-xs">Los campos marcados con * son obligatorios</p>
        </fieldset>
      </form>
    );
}

export default EditAllAuthorsForm;