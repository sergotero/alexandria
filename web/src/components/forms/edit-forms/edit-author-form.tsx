import type { Author, FullBook } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as AuthorServices from "./../../../services/author.services.tsx";

type EditAuthorFormProps = {
  fullbook: FullBook,
  authorList: Author[],
  updateBook: (id: number) => void
}

function EditAuthorForm({ fullbook, authorList, updateBook }: EditAuthorFormProps) {
  
  const { register, reset, handleSubmit } = useForm<any>();

  useEffect(() => {
    reset();
  }, [fullbook, reset]);

  const submit: SubmitHandler<any> = async (data: any) => {
    console.log("id nuevo", data);
    console.log("id antiguo", fullbook.author.id);
    
  }

  return (
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend>&nbsp;Autor&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="newAuthorID">Autor ID</label>
          <input 
            {...register("newAuthorID")}
            list="authorList"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="newAuthorID"/>
          <datalist id="authorList">
            {authorList.map((author) => <option value={author.id}>{author.alias}</option>)}
          </datalist>
        </div>

        <button type="submit" className="btn bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  )
}

export default EditAuthorForm;