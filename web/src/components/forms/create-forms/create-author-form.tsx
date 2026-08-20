import type { AuthorDTO, FullBook } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type CreateAuthorFormProps = {
  fullbook: FullBook,
  updateAuthor: (data: AuthorDTO) => void
}

function CreateAuthorForm({ fullbook, updateAuthor }: CreateAuthorFormProps){

  const{ register, handleSubmit, reset } = useForm<AuthorDTO>();

  useEffect(() => {
    reset({
      name: fullbook.author.name,
      lastname1: fullbook.author.lastname1,
      lastname2: fullbook.author.lastname2,
      lastname3: fullbook.author.lastname3,
    })
  }, [fullbook, reset]);

  const submit: SubmitHandler<AuthorDTO> = async (data: AuthorDTO) => {
    console.log("Raw data", data);
    // await AuthorServices.update(fullbook.author.id.toString(), data);
    // updateBook(fullbook.bookBase.id);
  }

  return (
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <legend>&nbsp;Autor&nbsp;</legend>
        <fieldset>
          <div className="input-group">
            <label htmlFor="name">Nombre</label>
            <input 
              {...register("name", {
                required: true
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="name"/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname1">Apellido 1</label>
            <input 
              {...register("lastname1")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname1"/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname2">Apellido 2</label>
            <input
              {...register("lastname2")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname2"/>
          </div>

          <div className="input-group">
            <label htmlFor="lastname3">Apellido 3</label>
            <input 
              {...register("lastname3")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="lastname3"/>
          </div>
          <button type="submit" className="btn bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
        </fieldset>
    </form>
  )
}

export default CreateAuthorForm;