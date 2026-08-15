import type { AuthorDTO, FullBook } from "@shared/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type EditAuthorFormProps = {
  fullbook: FullBook,
  updateAuthor: (id: number) => void
}

function EditAuthorForm({ fullbook, updateAuthor }: EditAuthorFormProps) {
  const { register, reset, handleSubmit } = useForm<AuthorDTO>();

  useEffect(() => {
    reset({
      name: fullbook.author.name,
      lastname1: fullbook.author.lastname1,
      lastname2: fullbook.author.lastname2,
      lastname3: fullbook.author.lastname3,
    })
  }, [fullbook, reset]);

  const submit = (data: AuthorDTO) => {
    console.log("Raw data", data);
    
  }

  return (
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend>&nbsp;Autor&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input 
            {...register("name", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"/>
        </div>

        <div className="input-group">
          <label htmlFor="name">Apellido 1</label>
          <input 
            {...register("lastname1")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"/>
        </div>

        <div className="input-group">
          <label htmlFor="name">Apellido 2</label>
          <input
            {...register("lastname2")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"/>
        </div>

        <div className="input-group">
          <label htmlFor="name">Apellido 3</label>
          <input 
            {...register("lastname3")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"/>
        </div>

        <button type="submit" className="btn bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  )
}

export default EditAuthorForm;